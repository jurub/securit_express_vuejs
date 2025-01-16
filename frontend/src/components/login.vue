<template>
  <div class="col-12 col-md-8 col-xl-4">
    <div>{{ data }}</div>
    <div>
      <input v-model="name" placeholder="Entrez votre nom" />
      <button @click="sendData">Envoyer</button>
      <p>{{ responseMessage }}</p>
    </div>
    <form @submit.prevent="authenticateUser" method="POST">
      <label for="email" class="form-label">E-mail</label>
      <div class="input-group mb-4">
        <span class="input-group-text"><i class="bi bi-at"></i></span>
        <input
          type="email"
          name="email"
          class="form-control form-control-lg"
          id="email"
          v-model="formData.email"
          placeholder="nom@exemple.com"
        />
      </div>
      <div class="mb-5">
        <label for="password" class="form-label">Mot de passe</label>
        <div class="input-group mb-3">
          <span class="input-group-text"><i class="bi bi-lock"></i></span>
          <input
            type="password"
            name="password"
            class="form-control form-control-lg"
            id="password"
            v-model="formData.password"
            placeholder=""
          />
        </div>
      </div>
      <button type="submit" value="submit" class="btn btn-primary btn-lg w-100">
        Connexion
      </button>
    </form>
    <p style="color: red">{{ errorMessage }}</p>
    <a href="/register" class="link-primary d-block text-center mt-4"
      >Créer un compte</a
    >
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import router from "/src/router";
import { userToVerify } from "/src/use/auth";

const data = ref(null);

// GET example
onMounted(async () => {
  const response = await fetch("/api/data");
  const result = await response.json();
  data.value = result.message;
});

// POST example
const name = ref("");
const responseMessage = ref("");

const sendData = async () => {
  try {
    const response = await fetch("/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name.value }),
    });
    const result = await response.json();
    responseMessage.value = result.message;
  } catch (error) {
    console.error("Erreur:", error);
  }
};

// POST
const formData = ref({});
const errorMessage = ref("");

async function authenticateUser() {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData.value),
  };
  const response = await fetch("/auth/authenticate_user", request);

  if (response.status === 200) {
    console.log("Youpi !");
    userToVerify.value = formData.value.email;
    console.log(userToVerify);
    router.push("/verification");
  } else {
    errorMessage.value = "email ou mot de passe incorrect";
  }
}
</script>
<style scoped></style>
