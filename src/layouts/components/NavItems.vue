<script setup>
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import VerticalNavSectionTitle from '@layouts/components/VerticalNavSectionTitle.vue'
</script>

<template>
  <VerticalNavLink
    :item="{
      title: 'Inicio',
      icon: 'mdi-home-outline',
      to: '/dashboard', 
    }"
  />

  <VerticalNavSectionTitle
    :item="{
      heading: 'Módulo de Boletas',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Cargar Planilla',
      icon: 'mdi-file-excel',
      to: '/carga-boletas',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Imprimir Boletas',
      icon: 'mdi-text-box-search-outline',
      to: '/buscar-boletas',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Certificados',
      icon: 'mdi-text-box-search-outline',
      to: '/certificados',
    }"
  />

  <VerticalNavSectionTitle
    :item="{
      heading: 'Configuración y Seguridad',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Usuarios y Accesos',
      icon: 'mdi-account-cog-outline',
      to: '/usuarios',
    }"
  />
  
  <VerticalNavLink
    :item="{
      title: 'Auditoría de Cargas',
      icon: 'mdi-shield-check-outline',
      to: '/auditoria',
    }"
  />
</template>
