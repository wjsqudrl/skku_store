import Vue from 'vue'
import { initializeApp } from 'firebase';
import { store } from './store/store.js'


// Your web app's Firebase configuration
const app = initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
});

Vue.prototype.$db = app.firestore()

Vue.prototype.$storage = app.storage().ref()

export const db = app.firestore();
export const arts = db.collection('arts');
export const userProfiles = db.collection('userProfiles');
export const naverTrend = db.collection('naverTrend');
export const follows = db.collection('follows');
export const appContents = db.collection('app');

export const storage = app.storage();
export const reviews = db.collection('reviews');
export const favorites = db.collection('favorites');

export async function dbRead(colName,docId) {
  console.log('dbRead')
  if(!docId){ // docId 입력 안됐으면, collection의 docsArray들을 받아옴
    try {
      const querySnapshot = await app.firestore().collection(colName).get()
      const docs = []
      await querySnapshot.forEach(doc => {
        docs.push(doc)
      })
      return docs
    } catch (err) {
    }
  }else{
    try {
      const doc = await app.firestore().collection(colName).doc(docId).get() // docSnapshot
      return doc
    } catch (err) {
    }
  }
}

export async function dbQuery(colName, key1, key2, key3, key4, key5, key6) {
  // console.log('dbQuery')
  if(!key4){
    try {
      const querySnapshot = await app.firestore().collection(colName).where(key1,key2,key3).get()
      const docs = []
      await querySnapshot.forEach(doc => {
        docs.push(doc)
      })
      return docs
    } catch (err) {
    }
  }else{
    try {
      const querySnapshot = await app.firestore().collection(colName).where(key1,key2,key3).where(key4,key5,key6).get()
      const docs = []
      await querySnapshot.forEach(doc => {
        docs.push(doc)
      })
      return docs
    } catch (err) {
    }
  }
}

export async function dbWrite(colName, input) {
  store.commit('changeNavBtnDisabled')
  let a = await app.firestore().collection(colName).add({  
    ...input,
  })
  store.commit('changeNavBtnDisabled')
  return a 
}

export async function dbUpdate(colName, docId, input) {
  console.log('dbUpdate')
  store.commit('changeNavBtnDisabled')
  try {
    await app.firestore().collection(colName).doc(docId).update({  
      ...input,
    })
  } catch (err) {
    console.log(err)
  }
  store.commit('changeNavBtnDisabled')
}

export async function dbDelete(colName, docId, colName2, docId2) {
  store.commit('changeNavBtnDisabled')
  if(!colName2){
    try {
      await app.firestore().collection(colName).doc(docId).delete()
    } catch (err) {
    }
  }
  else{
    try {
      await app.firestore().collection(colName).doc(docId).collection(colName2).doc(docId2).delete()
    } catch (err) {
    }
  }
  store.commit('changeNavBtnDisabled')
}