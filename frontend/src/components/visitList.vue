<script setup>
// import { ref, onMounted } from "vue";

// onMounted(async () => {
//   const response = await fetch(
//     `https://geo.api.gouv.fr/communes?codePostal=${zipcode.value}`
//   );
//   cityList.value = await response.json();
//   console.log("cityList", cityList.value);
//   for (const city of cityList.value) {
//     cities.value[city.code] = city;
//   }
// });
</script>
<template>
  <div class="col-12 col-md-8">
    <div class="d-flex align-items-center mb-5">
      <i class="bi bi-person-circle fs-3 me-3"></i>
      <p class="m-0">Bonjour, <%= user.email %> !</p>
    </div>
    <div class="mb-5 d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center">
        <h1 class="mb-0 me-4">Visites</h1>
        <a
          href="/visit-edit"
          class="link-primary fs-3 lh-1 mt-1"
          title="Ajouter une visite"
          ><i class="bi bi-plus-circle-fill"></i
        ></a>
      </div>
      <form action="">
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-search"></i></span>
          <input
            type="text"
            name="visit_search"
            class="form-control form-control-lg"
            id="visit_search"
            placeholder="Rechercher une visite"
          />
        </div>
      </form>
    </div>
    <table class="table table-striped align-middle">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Entreprise</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <% for (visit of visits) { %>
        <tr>
          <td><%= visit.date.toLocaleDateString() %></td>
          <td><%= visit.company.full_name %></td>
          <td>
            <div class="d-flex justify-content-end">
              <a href="" class="link-primary fs-3"
                ><i class="bi bi-arrow-right-circle-fill"></i
              ></a>
            </div>
          </td>
        </tr>
        <% } %>
      </tbody>
    </table>
  </div>
</template>
<style scoped></style>
