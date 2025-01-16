<script setup></script>
<template>
  <div class="col-12 col-md-8 col-xl-4">
    <form action="/create_account" method="POST">
      <label for="email" class="form-label">E-mail</label>
      <div class="input-group mb-4">
        <span class="input-group-text"><i class="bi bi-at"></i></span>
        <input
          type="email"
          name="email"
          class="form-control form-control-lg"
          id="email"
          placeholder="nom@exemple.com"
          required
        />
      </div>
      <div class="mb-4">
        <label for="password" class="form-label">Mot de passe</label>
        <div class="input-group mb-3">
          <span class="input-group-text"><i class="bi bi-lock"></i></span>
          <input
            type="password"
            name="password"
            class="form-control form-control-lg"
            id="password"
            placeholder=""
            required
          />
        </div>
      </div>
      <div class="mb-5">
        <label for="password" class="form-label"
          >Confirmer le mot de passe</label
        >
        <div class="input-group mb-3">
          <span class="input-group-text"><i class="bi bi-lock"></i></span>
          <input
            type="password"
            name="password_confirm"
            class="form-control form-control-lg"
            id="password_confirm"
            placeholder=""
            required
          />
        </div>
      </div>
      <% if (errorMessage) { %>
      <div class="mb-5 text-danger"><%= errorMessage %></div>
      <% } %>
      <button type="submit" value="submit" class="btn btn-primary btn-lg w-100">
        Créer
      </button>
    </form>
    <a href="/login" class="link-primary d-block text-center mt-4"
      >Se connecter</a
    >
  </div>
</template>
<style scoped></style>
