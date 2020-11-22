<template>
  <div columns>
    <div
      v-if="errorMessage"
      class="notification is-danger column is-half is-offset-one-quarter"
    >
      <button class="delete"></button>
      {{ errorMessage }}
    </div>

    <form class="column is-half is-offset-one-quarter" @submit.prevent="signup">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="text"
            placeholder="Username"
            id="username"
            required
            v-model="user.username"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
        <p class="help">
          Username can only contain alphanumerical characters and underscores.
          Username must be longer than 2 characters and shorter than 30.
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input
            class="input"
            type="password"
            placeholder="Password"
            id="password"
            required
            v-model="user.password"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
        <p class="help">Password must be equal or longer than 10 characters.</p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input
            class="input"
            type="password"
            placeholder="Confirm password"
            id="confirmPassword"
            required
            v-model="user.confirmPassword"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
        <p class="help">Please confirm your password.</p>
      </div>
      <div class="field">
        <p class="control">
          <button type="submit" class="button is-success">Signup</button>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import Joi from 'joi';

const schema = Joi.object().keys({
  username: Joi.string()
    .regex(/(^[a-zA-Z0-9_]+$)/)
    .min(2)
    .max(30)
    .required(),
  password: Joi.string().trim().min(10).required(),
  confirmPassword: Joi.string().trim().min(10).required(),
});

export default {
  name: 'Signup',
  data: () => ({
    errorMessage: '',
    user: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  }),
  watch: {
    user: {
      handler() {
        this.errorMessage = '';
      },
      deep: true,
    },
  },
  methods: {
    signup() {
      this.errorMessage = '';
      if (this.validUser()) {
        console.log("User is valid. Let's send it to the server");
      }
    },
    validUser() {
      if (this.user.password !== this.user.confirmPassword) {
        this.errorMessage = 'Password must match. 🙈 ';
        return false;
      }
      const result = schema.validate(this.user);
      if (result.error !== undefined) {
        if (result.error.message.includes('username')) {
          this.errorMessage = 'Username is not valid 😭';
        }
        if (result.error.message.includes('password')) {
          this.errorMessage = 'Password is not valid 🙈';
        }
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
</style>
