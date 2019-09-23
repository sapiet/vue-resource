<template>
  <div id="app">
    <h3>Vue Resource</h3>

    <div class="ui active dimmer" v-if="loading">
      <div class="ui loader"></div>
    </div>

    <div class="ui four column grid">
      <div class="column" v-for="user in users">
        <div class="ui card">
          <div class="content">
            <div class="header">
              <input type="text" v-model="user.name" style="width: 100%">
            </div>
            <div class="meta">
              <a href="">Friends</a>
            </div>
            <div class="description">
              {{ user.address.street }}<br>
              {{ user.address.zipcode }} {{ user.address.city }}<br>
            </div>
          </div>
          <div class="extra content">
            <div class="ui two buttons">
              <button class="ui basic green button" @click="edit(user)">
                Edit
              </button>
              <button class="ui basic red button" @click="remove(user)">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
const ENDPOINT = 'users{/id}';

export default {
  data() {
    return {
      loading: false,
      users: []
    }
  },
  mounted() {
    this.$user = this.$resource(ENDPOINT, {}, {}, {
      before: () => this.loading = true,
      after: () => this.loading = false,
    });

    this.$user.query(ENDPOINT).then(
      response => this.users = response.data,
      error => window.alert(error)
    )
  },
  methods: {
    edit(user) {
      this.$user.update({id: user.id}, {
        name: user.name
      }).then(
        response => {},
        error => window.alert(error)
      )
    },

    remove(user) {
      this.$user.remove({id: user.id}).then(
        response => this.users.splice(this.users.indexOf(user), 1),
        error => window.alert(error)
      )
    }
  }
}
</script>
