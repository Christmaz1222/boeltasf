<script setup>
// Aquí más adelante importaremos la función de Logout de tu backend
</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
    bordered
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg src="/src/assets/images/avatars/avatar-1.png" />

      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg src="/src/assets/images/avatars/avatar-1.png" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              Administrador
            </VListItemTitle>
            <VListItemSubtitle>
              DNTT - Policía Boliviana
            </VListItemSubtitle>
          </VListItem>

          <VDivider class="my-2" />

          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-account-outline"
                size="22"
              />
            </template>
            <VListItemTitle>Mi Perfil</VListItemTitle>
          </VListItem>

          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-cog-outline"
                size="22"
              />
            </template>
            <VListItemTitle>Configuración</VListItemTitle>
          </VListItem>

          <VDivider class="my-2" />

          <VListItem to="/login">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-logout"
                size="22"
              />
            </template>
            <VListItemTitle>Cerrar Sesión</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </VAvatar>
  </VBadge>
</template>
