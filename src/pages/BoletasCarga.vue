<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Carga Masiva de Planillas Excel">
        <VCardText>
          <VAlert v-if="mensaje" :type="tipoMensaje" class="mb-4" closable @click:close="mensaje = ''">
            {{ mensaje }}
          </VAlert>

          <VRow class="align-center">
            <VCol cols="12" md="8">
              <VFileInput
                v-model="archivo"
                label="Seleccione el archivo Excel (.xlsx)"
                accept=".xlsx, .xls"
                prepend-icon="mdi-file-excel"
                @change="leerExcel"
                @click:clear="limpiarTodo"
                color="primary"
              />
            </VCol>
            <VCol cols="12" md="4" class="d-flex gap-4">
              <VBtn color="error" variant="tonal" @click="limpiarTodo" :disabled="!archivo">
                <VIcon start icon="mdi-delete" />
                Eliminar Archivo
              </VBtn>
            </VCol>
          </VRow>
        </VCardText>

        <VDivider v-if="datosExcel.length > 0" />

        <VCardText v-if="datosExcel.length > 0">
          
          <VRow class="mb-6 mt-2">
            <VCol cols="12" md="4">
              <VCard color="info" variant="tonal" class="pa-2">
                <div class="d-flex justify-space-between align-center">
                  <div>
                    <p class="text-sm mb-1">Fecha de Registro</p>
                    <h4 class="text-h6 font-weight-bold">{{ fechaActual }}</h4>
                  </div>
                  <VIcon size="36" icon="mdi-calendar-check" opacity="0.7" />
                </div>
              </VCard>
            </VCol>

            <VCol cols="12" md="4">
              <VCard color="primary" variant="tonal" class="pa-2">
                <div class="d-flex justify-space-between align-center">
                  <div>
                    <p class="text-sm mb-1">Total Funcionarios</p>
                    <h4 class="text-h6 font-weight-bold">{{ datosExcel.length }} boletas</h4>
                  </div>
                  <VIcon size="36" icon="mdi-account-group" opacity="0.7" />
                </div>
              </VCard>
            </VCol>

            <VCol cols="12" md="4">
              <VCard color="success" variant="tonal" class="pa-2">
                <div class="d-flex justify-space-between align-center">
                  <div>
                    <p class="text-sm mb-1">Total Líquido Pagable</p>
                    <h4 class="text-h6 font-weight-bold">Bs. {{ formatearMoneda(totalLiquido) }}</h4>
                  </div>
                  <VIcon size="36" icon="mdi-cash-multiple" opacity="0.7" />
                </div>
              </VCard>
            </VCol>
          </VRow>

          <VTable fixed-header height="400px" class="border rounded bg-surface">
            <thead>
              <tr>
                <th class="text-uppercase">CI</th>
                <th class="text-uppercase">Nombre del Funcionario</th>
                <th class="text-uppercase">Mes</th>
                <th class="text-uppercase">Gestión</th>
                <th class="text-uppercase text-right">Líquido Pagable</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(fila, index) in datosExcel" :key="index">
                <td>{{ fila.ci }}</td>
                <td>{{ fila.nombre }}</td>
                <td>{{ fila.mes }}</td>
                <td>{{ fila.gestion }}</td>
                <td class="text-success font-weight-bold text-right">
                  {{ formatearMoneda(fila.liquido_pagable) }}
                </td>
              </tr>
            </tbody>
          </VTable>

          <div class="d-flex justify-end mt-6">
            <VBtn color="success" size="large" @click="guardarEnBD" :loading="guardando">
              <VIcon start icon="mdi-cloud-upload" />
              Confirmar y Guardar en Base de Datos
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
import { ref, computed } from 'vue'
import * as XLSX from 'xlsx'
import api from '@/api/axios'

// Variables reactivas
const archivo = ref(null)
const datosExcel = ref([])
const guardando = ref(false)
const mensaje = ref('')
const tipoMensaje = ref('info')

// Generar la fecha actual con formato boliviano (DD/MM/YYYY)
const fechaActual = ref(new Date().toLocaleDateString('es-BO'))

// Función para sumar todo el líquido pagable (NUEVO)
const totalLiquido = computed(() => {
  return datosExcel.value.reduce((suma, fila) => {
    // Nos aseguramos de convertir el texto del Excel a número, ignorando letras si las hay
    const valor = parseFloat(String(fila.liquido_pagable).replace(/[^0-9.-]+/g, "")) || 0
    return suma + valor
  }, 0)
})

// Función para ponerle comas a los miles y dos decimales (NUEVO)
const formatearMoneda = (valor) => {
  const numero = parseFloat(String(valor).replace(/[^0-9.-]+/g, "")) || 0
  return numero.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// Leer Excel
const leerExcel = (evento) => {
  const file = evento.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      
      const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" })
      datosExcel.value = json
      mensaje.value = 'Archivo leído. Verifique los totales antes de guardar.'
      tipoMensaje.value = 'info'
    } catch (error) {
      console.error(error)
      mensaje.value = 'Error al leer el archivo Excel.'
      tipoMensaje.value = 'error'
    }
  }
  reader.readAsArrayBuffer(file)
}

// Limpiar
const limpiarTodo = () => {
  archivo.value = null
  datosExcel.value = []
  mensaje.value = ''
}

// Guardar
const guardarEnBD = async () => {
  guardando.value = true
  try {
    // Al enviar, adjuntamos la fecha exacta del registro para tu auditoría
    const response = await api.post('/boletas/carga-masiva', {
      boletas: datosExcel.value,
      fecha_registro: new Date()
    })
    
    mensaje.value = '¡Excelente! Planilla de boletas registrada correctamente.'
    tipoMensaje.value = 'success'
    
    setTimeout(() => {
      limpiarTodo()
    }, 3000)

  } catch (error) {
    console.error("Error en la petición:", error)
    mensaje.value = 'Error al guardar en la base de datos: ' + (error.response?.data?.message || 'Problema de conexión')
    tipoMensaje.value = 'error'
  } finally {
    guardando.value = false
  }
}
</script>
