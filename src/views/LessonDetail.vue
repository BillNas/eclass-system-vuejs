<template>
  <div class="container">
    <div class="card border-primary mt-3" style="max-width: 40rem;">
      <div class="card-header" v-if="lesson.name">
        <h2>{{ lesson.name }}</h2>
      </div>
      <h3 class="card-header">
        Professor: <b>{{ lesson.professor }}</b>
      </h3>
      <h4 class="card-header">Email: {{ lesson.professor_email }}</h4>
      <div class="card-body">
        <h4 class="card-title">
          Registered Students
          <span class="badge badge-primary badge-pill">
            {{ lesson.registered.length }}
          </span>
        </h4>
        <ul class="list-group" v-if="lesson.registered">
          <li
            v-for="student in lesson.registered"
            :key="student.id"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            {{ student }}
          </li>
        </ul>
      </div>
    </div>
    <hr />
    <button
      type="submit"
      class="btn btn-primary mb-2 mr-3"
      @click="showPostForm = !showPostForm"
      v-if="user.user.displayName == lesson.professor"
    >
      Create Announcement
    </button>
    <button
      type="submit"
      class="btn btn-success mb-2"
      @click="showStudentForm = !showStudentForm"
      v-if="user.user.displayName == lesson.professor"
    >
      Register a Student
    </button>

    <form
      class="form mt-3"
      @submit.prevent="onRegisterStudent"
      v-if="user.user.displayName == lesson.professor && showStudentForm"
    >
      <h1>Register a Student to {{lesson.name}}</h1>
      <div class="form-group">
        <b for="firstName">First Name</b>
        <input type="text" class="form-control" v-model="firstName" />
      </div>
      <div class="form-group">
        <b for="lastName">Last Name</b>
        <input type="text" class="form-control" v-model="lastName" />
      </div>
      <div class="form-group">
        <b for="lastName">ID Number</b>
        <input type="number" class="form-control" v-model="regNumber" />
      </div>
      <button type="submit" class="btn btn-primary mb-2">Register</button>
    </form>

    <form
      class="form mt-3"
      @submit.prevent="onCreateLessonPost"
      v-if="user.user.displayName == lesson.professor && showPostForm"
    >
      <h1>Create an Announcement</h1>
      <div class="form-group">
        <b for="announcement">Announcement</b>
        <textarea
          class="form-control"
          id="exampleTextarea"
          rows="3"
          v-model="post"
        ></textarea>
      </div>
       <div class="form-group">
                <label for="url">Announcement URL</label>
                <input class="form-control" v-model="url" />
            </div>
      <button type="submit" class="btn btn-primary mb-2">Post</button>
    </form>
    <hr />
    <form>
          <div class="form-group">
            <label for="searchTerm">Search Post for {{lesson.name}}</label>
              <input type="text" class="form-control" v-model="searchTerm">
          </div>
      </form>
     <h1>
            Posts <span class="badge badge-dark">{{filteredPosts.length}}</span>
        </h1>
    <div v-if="filteredPosts.length == 0">
          <span class="badge badge-warning mt-4"><h2>No Posts found</h2></span>
          </div>
    <div
      class="card border-primary mt-3"
      style="max-width: 40rem;"
      v-for="post in filteredPosts"
      :key="post.id"
    >

          <div class="card-body">
        <h6>{{post.user_id}}</h6>
        <hr>
        <h5 class="card-header">
          {{ post.post }}
        </h5>
          <div class="card-image"
                      v-if="isImage(post.url) ">
                      <a :href="post.url">
                      <figure class="image">
                          <img :src="post.url"
                              alt="Placeholder image">
                      </figure>
                      </a>
                  </div>
                  <div class="card-header" v-else>
                      <a :href="post.url">{{post.url}}</a>  
                  </div>
        <button class="btn btn-danger mt-1" @click="deleteLessonPost(post.id)" v-if="user.user.displayName == post.user_id"> 
            Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      post: "",
      searchTerm:'',
      regNumber: "",
      showStudentForm: false,
      showPostForm: false
    };
  },

  computed: {
    ...mapState("lessons", ["lesson","lessonPosts"]),
    ...mapGetters({
      user: "users/user",
      lesson: "lessons/Lesson"
    }),
    filteredPosts() {
            if (this.searchTerm) {
                const regexp = new RegExp(this.searchTerm, 'gi');
                return this.lessonPosts.filter(filteredPost =>
                    (filteredPost.post).match(regexp));
            }
            return this.lessonPosts;
        },
  },
  mounted() {

    this.initLesson(this.$route.params.name);
    this.initLessonPosts(this.$route.params.name);
    
  },
  watch: {
    "req.params.name": function() {
      this.initLesson(this.$route.params.name);
    }
  },


  methods: {
    ...mapActions("lessons", ["initLesson", "registerStudent",'createLessonPost','initLessonPosts','deleteLessonPost']),
    onRegisterStudent() {
      if (this.firstName && this.lastName && this.regNumber) {
        this.$store.dispatch("lessons/registerStudent", {
          firstName: this.firstName,
          lastName: this.lastName,
          regNumber: this.regNumber
        });
      }
    },
   async onCreateLessonPost() {
      if (this.post || this.url) {
        this.$store.dispatch("lessons/createLessonPost", {
          post: this.post,
          url: this.url
        });
        this.post = ''
        this.url = ''
      }
    },
     isImage(url){
           if(url){
            return url.match(/(png|jpg|jpeg|gif)$/);
           }
          }
    
  }
};
</script>

<style></style>
