/* npm runs
npm install react-chartjs-2 chart.js
npm install recharts
npm run dev
npm i
npm install firebase
npm install react-chartjs-2 chart.js@3
npm install victory


 npm install react-chartjs-2 chart.js --force 
 && npm install recharts --force 
 && npm install react-chartjs-2 chart.js@3 --force 
 &&   && npm i --force 
&& npm install firebase --force &&
 npm install victory --force
*/




import { initializeApp } from "firebase/app"
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where,
    documentId
} from "firebase/firestore/lite"

 




const firebaseConfig = {
    apiKey: "AIzaSyC42g_FKCivc7LsKFKU8zBtjiCRvUrWD34",
    authDomain: "vanlife-65757.firebaseapp.com",
    projectId: "vanlife-65757",
    storageBucket: "vanlife-65757.appspot.com",
    messagingSenderId: "217261920295",
    appId: "1:217261920295:web:d56b14126159c0bb11be02"
  };
  

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Refactoring the fetching functions below
const vansCollectionRef = collection(db, "vans")


export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}


export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}