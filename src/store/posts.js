import db from "@/db";
import { firestoreAction } from "vuexfire";

const posts = db.collection("posts").orderBy("created_at", 'desc');
const post = db.collection("posts")
const state = {
    posts: []
};

const actions = {
    initPosts: firestoreAction(({ bindFirestoreRef }) => {
        bindFirestoreRef("posts", posts);
    }),
    async deletePost(_, id) {
        await post.doc(id).delete();
    },
};


export default {
    namespaced: true,
    state,
    actions,
};