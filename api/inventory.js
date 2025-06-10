import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBJZZXM6H1Ip6waZHUMef02haoyhAUV9Ao",
  authDomain: "farmers-fruit-system.firebaseapp.com",
  databaseURL: "https://farmers-fruit-system-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "farmers-fruit-system",
  storageBucket: "farmers-fruit-system.appspot.com",
  messagingSenderId: "112777234762",
  appId: "1:112777234762:web:1a9290a2cc3128828f99b3"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default async function handler(req, res) {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, '입고기록'));
    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).json({ error: "No data found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

