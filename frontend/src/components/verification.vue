<template>
  <div class="col-12 col-md-8 col-xl-4">
    <h2>Vérifiez votre boîte mail et tapez le code de confirmation</h2>
    <form @submit.prevent="verifyUser" method="POST">
      <label for="email" class="form-label">Code de confirmation</label>
      <div class="mb-4">
        <input
          type="text"
          name="code"
          class="form-control form-control-lg"
          id="code"
          v-model="verificationCode"
        />
      </div>
      <button type="submit" value="submit" class="btn btn-primary btn-lg w-100">
        Continuer
      </button>
    </form>
    <p style="color: red">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import router from "/src/router";
import { userToVerify } from "/src/use/auth";

const verificationCode = ref("");
const errorMessage = ref("");

async function verifyUser() {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code: verificationCode.value,
      email: userToVerify.value,
    }),
  };
  const response = await fetch("/auth/verify_code", request);

  if (response.status === 200) {
    console.log("Vérifié !");
    router.push("/visites");
  } else {
    errorMessage.value = "code invalide";
  }
}
</script>

<style scoped></style>
