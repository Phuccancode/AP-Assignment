// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getAuth,signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, get,ref,update} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"; // Import the getDatabase function from the firebase-database module
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

	  document.getElementById("login").addEventListener("click", function() {
		var email =  document.getElementById("email").value;
		var password = document.getElementById("password").value;
		if(email.includes("hospital.")==true||email=="admin@gmail.com"){
			alert("Vui lòng đăng nhập với tài khoản bệnh nhân!!");
			return;
		}
		  signInWithEmailAndPassword(auth, email, password)
		  .then((userCredential) => {
		    // Signed in 
		    const user = userCredential.user;
			console.log(user);
			alert("Đăng nhập thành công!!");
			document.getElementById('container-ring').style.display = 'none';
			document.getElementById('buttonlogout').style.display = 'block';
			get(ref(database, 'users/' + user.uid)).then((snapshot) => {
				if (snapshot.exists()) {
				  document.getElementById("message").innerHTML = "Xin chào " + snapshot.val().name;
				}
				else {
					document.getElementById("message").innerHTML = "Vui lòng cập nhật thông tin cá nhân";
				}
				document.getElementById('updateaccount').style.display = 'block';
				document.getElementById('tracuutaikhoan').style.display = 'block';
				document.getElementById('scedule').style.display = 'block';
			  }).catch((error) => {
				console.error(error);
			  });
			document.getElementById("updateaccount").addEventListener("click", function() {
			document.getElementById('formupdate').style.display = 'block';
			document.getElementById('registerscedule').style.display = 'none';
			document.getElementById('tracuu_thongtin').style.display = 'none';
			});

			document.getElementById("scedule").addEventListener("click", function() {
				document.getElementById('formupdate').style.display = 'none';
				document.getElementById('registerscedule').style.display = 'block';
				document.getElementById('tracuu_thongtin').style.display = 'none';
			});
			document.getElementById('tracuutaikhoan').addEventListener("click", function() {
				document.getElementById('tracuu_thongtin').style.display = 'contents';
				document.getElementById('formupdate').style.display = 'none';
				document.getElementById('registerscedule').style.display = 'none';
				get(ref(database, 'users/' + user.uid)).then((snapshot) => {
					if (snapshot.exists()) {
						document.getElementById("name_tracuu").innerHTML = snapshot.val().name;
						document.getElementById("phone_tracuu").innerHTML = snapshot.val().phone;
						document.getElementById("address_tracuu").innerHTML = snapshot.val().address;
						document.getElementById("gender_tracuu").innerHTML = snapshot.val().gender;
						document.getElementById("dateofbirth_tracuu").innerHTML = snapshot.val().dateofbirth;
					}
				})
				get(ref(database, 'users/' + user.uid)).then((snapshot) => {
					if (snapshot.exists()) {
						document.getElementById("date_tracuu").innerHTML = snapshot.val().date;
						document.getElementById("time_tracuu").innerHTML = snapshot.val().time;
						document.getElementById("specialization_tracuu").innerHTML = snapshot.val().specialization;
						document.getElementById("status_tracuu").innerHTML = snapshot.val().status;
						document.getElementById("chandoan_tracuu").innerHTML = snapshot.val().chandoan;
						document.getElementById("dieutri_tracuu").innerHTML = snapshot.val().dieutri;
						document.getElementById("yourhealthcare_tracuu").innerHTML = snapshot.val().yourhealthcare_name;
				
					}
				})
			});
			


			document.getElementById("update").addEventListener("click", function() {
				var name = document.getElementById("name").value;
				var phone = document.getElementById("phone").value;
				var address = document.getElementById("address").value;
				var gender = document.getElementById("gender").value;
				var dateofbirth = document.getElementById("dateofbirth").value;

				update(ref(database, 'users/' + user.uid), {
					email: email,
					name: name,
					phone: phone,
					address: address,
					gender: gender,
					dateofbirth: dateofbirth
				  });
			  alert("Cập nhật thông tin thành công, vui lòng đăng nhập lại!!");
			  document.getElementById("formupdate").style.display = "none";
			  });
			document.getElementById("register").addEventListener("click", function() {
				var date = document.getElementById("date").value;
				var time = document.getElementById("time").value;
				var specialization = document.getElementById("specialization").value;
				update(ref(database, 'users/' + user.uid), {
					date: date,
					time: time,
					specialization: specialization,
					status: "Chưa khám bệnh",
					chandoan: "Chưa có",
					dieutri: "Chưa có"
				  });
				get(ref(database, 'healthcares/')).then((snapshot) => {
					var data = snapshot.val();
					for(var key in data) {
						if(data[key].specialization == specialization) {
							update(ref(database, 'users/' + user.uid), {
								yourhealthcare: key,
								yourhealthcare_name: data[key].name
							});
							return;
						}
					}
				})
			  alert("Đăng ký lịch khám bệnh thành công!!");
			  document.getElementById('registerscedule').style.display = 'none';
			  });

			  
		  })
		  .catch((error) => {
		    const errorCode = error.code;
		    const errorMessage = error.message;
		    console.log(errorMessage);
		    alert(error);
		  });
	  });
	  document.getElementById("logout").addEventListener("click", function() {

		signOut(auth).then(() => {
			alert("Đăng xuất thành công!!");
		});
		location.reload();

	});

	
	
		


	  //----- End
