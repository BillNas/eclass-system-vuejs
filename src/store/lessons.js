import { firestoreAction } from "vuexfire";
import db from "@/db";
import firebase from "firebase";

const lessons = db.collection("lessons");
const lessonPosts = db.collection("POSTS").orderBy("created_at",'desc');


const state = {
    lessons: [],
    lessonPosts: [],
    lesson: {},
    error: null
};
const getters = {
    Lesson: state => (state.lesson[0] ? state.lesson[0] : {})
};
const mutations = {};

const actions = {

    async registerStudent({ getters }, payload) {
        const lesson = getters.Lesson;
        await lessons.doc(lesson.id).update({
            registered: firebase.firestore.FieldValue.arrayUnion(
                `${payload.firstName} ${payload.lastName} ${payload.regNumber}`
            )
        });
        alert("Success");
    },
    async deleteLesson(_, id) {
        await lessons.doc(id).delete();
        alert("Lesson Deleted");
    },
    async deleteLessonPost(_, id) {
        await lessonPosts.doc(id).delete();
    },
    async createLessonPost({ getters }, lessonPost) {
        const result = lessonPosts.doc();
        lessonPost.id = result.id;
        lessonPost.lesson_id = getters.Lesson.name;
        lessonPost.user_id = getters.Lesson.professor;
        lessonPost.created_at = firebase.firestore.FieldValue.serverTimestamp();
        lessonPost.updated_at = firebase.firestore.FieldValue.serverTimestamp();
        try {
            await lessonPosts.doc(lessonPost.id).set(lessonPost);
        } catch (error) {
            console.error(error);
        }
    },
    initLessons: firestoreAction(({ bindFirestoreRef }) => {
        bindFirestoreRef("lessons", db.collection("lessons"));
    }),
    initLesson: firestoreAction(({ bindFirestoreRef }, name) => {
        bindFirestoreRef("lesson", db.collection("lessons").where("name", "==", name));
    }),
    initLessonPosts: firestoreAction(({ bindFirestoreRef }, id) => {
        bindFirestoreRef('lessonPosts', lessonPosts.where("lesson_id", "==", id))
    }),
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};