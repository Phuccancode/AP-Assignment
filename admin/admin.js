// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, set, ref,get } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"; // Import the getDatabase function from the firebase-database module
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
		if(email=="admin@gmail.com"){
		  signInWithEmailAndPassword(auth, email, password)
		  .then((userCredential) => {
		    // Signed in 
		    const user = userCredential.user;
			console.log(user);
			document.getElementById('login-admin').style.display = 'none';
			//print on web page
			alert("Bạn đã đăng nhập thành công với quyền quản trị viên")
			document.getElementById('slide-menu').style.display = 'block';
			document.getElementsByClassName('menu-trigger')[0].style.display = 'inline-block';
			document.getElementById('createaccount').style.display = 'block';
			document.getElementById('listhealthcare').style.display = 'block';
			document.getElementById('listpatient').style.display = 'block';
			document.getElementById("createaccount").addEventListener("click", function() {
				document.getElementById('registerhealthcare').style.display = 'flex';
				document.getElementById('list_healthcare').style.display = 'none';
				document.getElementById('list_patient').style.display = 'none';
			});
			document.getElementById("listhealthcare").addEventListener("click", function() {
				document.getElementById('registerhealthcare').style.display = 'none';
				document.getElementById('list_healthcare').style.display = 'block';
				document.getElementById('list_patient').style.display = 'none';
			});
			document.getElementById("listpatient").addEventListener("click", function() {
				document.getElementById('registerhealthcare').style.display = 'none';
				document.getElementById('list_healthcare').style.display = 'none';
				document.getElementById('list_patient').style.display = 'block';
			});

			document.getElementById("register").addEventListener("click", function() {
				var email =  document.getElementById("email_hospital").value;
				var password = document.getElementById("password_hospital").value;
				if(email.includes("hospital.")==false) {
					alert("Email không hợp lệ, vui lòng nhập lại!!!");
					return;
				}
				createUserWithEmailAndPassword(auth, email, password)
				  .then((userCredential) => {
					const user = userCredential.user
					console.log(user);
					alert("Đăng ký thành công");
					document.getElementById('registerhealthcare').style.display = 'none';
				})
				  .catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					console.log(errorMessage);
					alert(error);
				});
			});
			var check_health = 0;
			var check_patient = 0;
			document.getElementById("getdata_health").addEventListener("click", function() {
				if(check_health == 1) {return;}
				get(ref(database, 'healthcares/')).then((snapshot) => {
					if(snapshot.val()) {
						var data = snapshot.val();
						var table = document.getElementById("listhealthcaretable");
						var i = 0;
						for(var key in data) {
							var row = table.insertRow(i);
							var cell1 = row.insertCell(0);
							var cell2 = row.insertCell(1);
							var cell3 = row.insertCell(2);
							var cell4 = row.insertCell(3);
							var cell5 = row.insertCell(4);
							var cell6 = row.insertCell(5);
							var cell7 = row.insertCell(6);
							var cell8 = row.insertCell(7);
							var cell9 = row.insertCell(8);
							cell1.innerHTML = i+1;
							cell2.innerHTML = data[key].name;
							cell3.innerHTML = data[key].gender;
							cell4.innerHTML = data[key].dateofbirth;
							cell5.innerHTML = data[key].chuyenmon
							cell6.innerHTML = data[key].hocvi;
							cell7.innerHTML = data[key].specialization;
							cell8.innerHTML = data[key].phone;
							cell9.innerHTML = data[key].address;
							i++;
						}
					}
				})
				check_health = 1;
			});
			document.getElementById("hidden_health").addEventListener("click", function() {
				var table = document.getElementById("listhealthcaretable");
				table.innerHTML = "";
				check_health = 0;
			})

			document.getElementById("getdata_patient").addEventListener("click", function() {
				if(check_patient == 1) {return;}
				get(ref(database, 'users/')).then((snapshot) => {
					if(snapshot.val()) {
						var data = snapshot.val();
						var table = document.getElementById("listpatienttable");
						var i = 0;
						for(var key in data) {
							var row = table.insertRow(i);
							var cell1 = row.insertCell(0);
							var cell2 = row.insertCell(1);
							var cell3 = row.insertCell(2);
							var cell4 = row.insertCell(3);
							var cell5 = row.insertCell(4);
							var cell6 = row.insertCell(5);
							var cell7 = row.insertCell(6);
							var cell8 = row.insertCell(7);
							var cell9 = row.insertCell(8);
							var cell10 = row.insertCell(9);
							cell1.innerHTML = i+1;
							cell2.innerHTML = data[key].name;
							cell3.innerHTML = data[key].gender;
							cell4.innerHTML = data[key].dateofbirth;
							cell5.innerHTML = data[key].phone;
							cell6.innerHTML = data[key].address;
							cell7.innerHTML = data[key].specialization;
							cell8.innerHTML = data[key].yourhealthcare_name;
							cell9.innerHTML = data[key].chandoan;
							cell10.innerHTML = data[key].dieutri;
							i++;
						}
					}
				})
				check_patient=1;
			});
			document.getElementById("hidden_patient").addEventListener("click", function() {
				var table = document.getElementById("listpatienttable");
				table.innerHTML = "";
				check_patient = 0;
			})
			
		  })
		  .catch((error) => {
		    const errorCode = error.code;
		    const errorMessage = error.message;
		    console.log(errorMessage);
		    alert(error);
		  });
		}
		else {
			alert("Bạn không phải là quản trị viên");
		}
	  });

	  
	
	
		


	  //----- End
