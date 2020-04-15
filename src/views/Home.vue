<template>
    <div class="container mt-5 mb-5">
        <h1>Eclass UTH</h1>
        <form @submit.prevent="onCreatePost()" v-if="user.user.displayName == 'System Admin'">
            <div class="form-group">
                <label for="title">Post Title</label>
                <input type="text" class="form-control" v-model="title" required/>
            </div>
            <div class="form-group">
                <label for="content">Post Content</label>
                <textarea rows=3 class="form-control" v-model="content"  />
            </div>
           <div class="form-group">
                <label for="url">Post URL</label>
                <input class="form-control" v-model="url" />
            </div>
            <button class="btn btn-primary btn-lg ">Add Post</button>
        </form>
        <br>
        <form>
          <div class="form-group">
            <label for="searchTerm">Search Post</label>
              <input type="text" class="form-control" v-model="searchTerm">
          </div>
      </form>
        <h1>
            Posts <span class="badge badge-dark">{{filteredPosts.length}}</span>
        </h1>
          <div v-if="filteredPosts.length == 0">
          <span class="badge badge-warning mt-4"><h2>No Posts found</h2></span>
          </div>
        <div class="card border-primary mb-3" style="max-width: 25rem;" v-for="post in filteredPosts" :key="post.id">
            <div class="card-header">               
            <h4 class="card-title">{{post.title}}</h4></div>
            <div class="card-body">
                <p class="card-text">{{post.content}}</p>
                <div class="card-image"
                      v-if="isImage(post.url) ">
                      <a :href="post.url">
                      <figure class="image">
                          <img :src="post.url"
                              alt="Placeholder image">
                      </figure>
                      </a>
                  </div>
                  <div v-else>
                      <a :href="post.url">{{post.url}}</a>  
                  </div>
                 <time>Posted by <b>{{post.user}}</b></time>
                 <button class="btn btn-danger mt-1" @click="deletePost(post.id)" v-if="user.user.displayName == 'System Admin'"> 
            Delete
        </button>
            </div>
          </div>
          </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import db from '@/db';
export default {
    name: "home",
    data() {
        return {
            title: '',
            content: '',
            url: '',
            searchTerm: '',
           
        }
    },
    mounted() {
        this.initPosts();
    },
    computed: {
        ...mapState('posts', ['posts']),
        ...mapGetters({
            user: "users/user"
        }),
        filteredPosts() {
            if (this.searchTerm) {
                const regexp = new RegExp(this.searchTerm, 'gi');
                return this.posts.filter(post =>
                    (post.title + post.content).match(regexp));
            }
            return this.posts;
        },
    },
    methods: {
        ...mapActions('posts', ['initPosts','deletePost']),
        onCreatePost() {
          if(this.content || this.url){
            db.collection('posts').add({
                    title: this.title,
                    content: this.content,
                    url:this.url,
                    user: 'Admin',
                    created_at: new Date(),
                })
                .then(doc => {
                    this.title = ''
                    this.content = ''
                    this.url =  ''
                    console.log(doc.id)
                })
                .catch(error => {
                    console.error('Error adding employee: ', error)
                })
          }
          else{
            alert("Fill the fields")
          }
          },
         isImage(url){
           if(url){
            return url.match(/(png|jpg|jpeg|gif)$/);
           }
          }
        },
}
</script>

<style>

</style>