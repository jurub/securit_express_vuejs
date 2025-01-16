<script setup></script>
<template>
  <div class="col-12 col-md-8">
    <div class="mb-5 d-flex align-items-center">
      <a href="/visit-list" class="link-primary fs-3 lh-1 mt-1" title="Retour"
        ><i class="bi bi-arrow-left-circle-fill"></i
      ></a>
      <h1 class="mb-0 ms-4">Édition d'une visite</h1>
    </div>
    <form action="/create_visit" method="POST">
      <label for="date" class="form-label">Date</label>
      <div class="mb-4">
        <input
          type="date"
          name="visit_date"
          class="form-control form-control-lg"
          id="visit_date"
        />
      </div>
      <label for="company" class="form-label">Entreprise</label>
      <select
        name="company"
        id="company"
        class="form-select form-select-lg mb-4"
      >
        <option selected>Choisir une entreprise</option>
        <% for (company of companies) { %>
        <option value="<%= company.id %>"><%= company.full_name %></option>
        <% } %>
      </select>
      <div class="mb-5">
        <label for="report" class="form-label">Compte-rendu</label>
        <textarea
          name="report"
          id="report"
          class="form-control"
          rows="10"
        ></textarea>
      </div>
      <button
        type="submit"
        value="submit"
        class="btn btn-primary btn-lg d-block mx-auto"
      >
        Valider
      </button>
    </form>
  </div>
</template>
<style scoped></style>
