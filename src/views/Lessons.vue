<template>
    <div class="container">
        <h1>
          Lessons <span class="badge badge-dark">{{filteredLessons.length}}</span>
        </h1>
        <form>
            <div class="form-group">
                <label for="searchTerm">Search for a Lesson</label>
                <input type="text" class="form-control" v-model="searchTerm">
            </div>
        </form>
        <div v-if="filteredLessons.length == 0 ">
            <span class="badge badge-warning mt-4"><h2>No Lessons found</h2></span>
        </div>
        <table v-else class="table table-dark">
            <thead>
                <tr>
                    <th scope="col">Lesson</th>
                    <th scope="col">Semester</th>
                    <th scope="col">Professor</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                <tr class="table-active" v-for="lesson in filteredLessons" :key="lesson.name">
                    <td>
                        <router-link :to="{
                              name: 'lesson',
                              params: {
                                name: lesson.name,
                              }
                            }">{{lesson.name}}</router-link>
                    </td>
                    <td>{{lesson.semester}}</td>
                    <td>{{lesson.professor}}</td>
                    <td>{{lesson.professor_email}}</td>
                    <button class="btn btn-danger mt-1" @click="deleteLesson(lesson.id)" v-if="user.user.displayName == 'System Admin'">
                        Delete
                    </button>
                </tr>
            </tbody>
        </table>
        <form @submit.prevent="onCreateLesson()">
            <div v-if="error" class="alert alert-dismissible alert-danger mt-2">
                <small>{{error}}</small>
            </div>
            <div class="form-group mt-4">
                <label for="name">Lesson Name</label>
                <input type="text" class="form-control" v-model="name" required>
            </div>
            <div class="form-group mt-4">
                <label for="semester">Semester</label>
                <br>
                <select class="custom-select" v-model="semester">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                </select>
            </div>
            <button class="btn btn-primary btn-lg ">Add Lesson</button>
        </form>
    </div>
</template>
<script>
    import {
        mapState, mapActions, mapGetters
    }
    from 'vuex';
    import firebase from 'firebase'
    import db from '@/db';
    export default {
        data() {
                return {
                    error: null,
                    searchTerm: '',
                    name: null,
                    semester: null

                }
            },

            mounted() {
                this.initLessons();
                console.log(firebase.auth().currentUser.providerData[0])
            },
            computed: {
                ...mapState('lessons', ['lessons']),
                    ...mapGetters({
                        user: 'users/user',
                    }),
                    filteredLessons() {
                        if (this.searchTerm) {
                            const regexp = new RegExp(this.searchTerm, 'gi');
                            return this.lessons.filter(filteredLesson =>
                                (filteredLesson.semester + filteredLesson.name + filteredLesson.professor).match(regexp));
                        }
                        return this.lessons;
                    },

            },
            methods: {
                ...mapActions('lessons', ['initLessons', 'deleteLesson']),
                    onCreateLesson() {
                        db.collection('lessons').add({
                                name: this.name,
                                created_at: new Date(),
                                professor: firebase.auth().currentUser.providerData[0].displayName,
                                professor_email: firebase.auth().currentUser.providerData[0].email,
                                semester: this.semester,
                                registered: [],

                            })
                            .then(doc => {
                                this.name = ''
                                this.semester = ''
                                console.log(doc.id)
                            })
                            .catch(error => {
                                console.error('Error adding employee: ', error)
                            })

                    }
            }
    }
</script>