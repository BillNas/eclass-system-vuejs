/* eslint-disable */
import firebase from '@/firebase';
import db from '@/db';
import store from '@/store';
import router from '@/router';

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if (user.user) {
            /* eslint-disable */
            user = user.user;
            /* eslint-enable */
    }
    const setUser = {
      id: user.uid,
      name: user.displayName,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    };
    db.collection("users")
      .doc(setUser.id)
      .set(setUser);
    store.commit("index/setUser", setUser);
    router.push("/");
  } else {
    store.commit("index/setUser", null);
  }
});
