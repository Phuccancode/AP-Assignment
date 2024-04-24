// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref,update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"; // Import the getDatabase function from the firebase-database module
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB9UHtfar_aj_KMTCSGk3FFwsIEu9Bzhps",
    authDomain: "testapp-edad4.firebaseapp.com",
    databaseURL: "https://testapp-edad4-default-rtdb.firebaseio.com",
    projectId: "testapp-edad4",
    storageBucket: "testapp-edad4.appspot.com",
    messagingSenderId: "697812370469",
    appId: "1:697812370469:web:903ffc208ee68bd0912bcc",
    measurementId: "G-B7010FEL1S"
  };

	  // Initialize Firebase
	  const app = initializeApp(firebaseConfig);
	  const analytics = getAnalytics(app);
	  const auth = getAuth();
	  const database = getDatabase(app);
	  console.log(app);

	  

	  //----- New Registration code start	  
	  document.getElementById("register").addEventListener("click", function() {
		var email =  document.getElementById("email").value;
		var password = document.getElementById("password").value;
		if(email.includes("hospital.")) {
			alert("Bạn không thể đăng ký loại tài khoản này!!");
			return;
		}
		  createUserWithEmailAndPassword(auth, email, password)
		  .then((userCredential) => {
		    const user = userCredential.user;
		    console.log(user);
		    alert("Đăng ký thành công, vui lòng cập nhật thông tin!!");
			window.location.href = "/patient/patient.html";
		  })
		  .catch((error) => {
		    const errorCode = error.code;
		    const errorMessage = error.message;
		    // ..
		    console.log(errorMessage);
		    alert(error);
		  });
	  });
	

		


	  //----- End
