// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getAuth,signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, set, ref, get,update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"; // Import the getDatabase function from the firebase-database module
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
	  document.getElementById("login").addEventListener("click", function() {
		var email =  document.getElementById("email").value;
		var password = document.getElementById("password").value;
		if(email.includes("hospital.")==false){
			alert("Vui lòng đăng nhập với tài khoản nhân viên y tế!!!");
			return;
		}
		else{
		  signInWithEmailAndPassword(auth, email, password)
		  .then((userCredential) => {
		    // Signed in 
		    const user = userCredential.user;
			console.log(user);
			alert("Đăng nhập thành công!!")
			get(ref(database, 'healthcares/' + user.uid)).then((snapshot) => {
				if (snapshot.exists()) {
				  document.getElementById("message").innerHTML = "Xin chào " +  snapshot.val().name;
				}
				else{
					alert("Vui lòng cập nhật thông tin cá nhân!!");
				}
			})
			document.getElementById('buttonlogout').style.display = 'block';
			document.getElementById('formaccount').style.display = 'none';
			document.getElementById('updateaccount').style.display = 'block';
			document.getElementById('mypatient').style.display = 'block';
			document.getElementById('tracuutaikhoan').style.display = 'block';
			document.getElementById("updateaccount").addEventListener("click", function() {
				document.getElementById('formupdate').style.display = 'block';
				document.getElementById('thongtintaikhoan').style.display = 'none';
				document.getElementById("listpatient").style.display = "none";
				document.getElementById("tracuu_thongtin").style.display = "none";
			});
			document.getElementById("mypatient").addEventListener("click", function() {
				document.getElementById('formupdate').style.display = 'none';
				document.getElementById('thongtintaikhoan').style.display = 'none';
				document.getElementById("listpatient").style.display = "none";
				document.getElementById("tracuu_thongtin").style.display = "none";
			});
			document.getElementById("tracuutaikhoan").addEventListener("click", function() {
				document.getElementById("listpatient").style.display = "none";
				document.getElementById('formupdate').style.display = 'none';
				document.getElementById("tracuu_thongtin").style.display = "none";
				document.getElementById('thongtintaikhoan').style.display = 'contents';
				get(ref(database, 'healthcares/' + user.uid)).then((snapshot) => {
					if (snapshot.exists()) {
					  document.getElementById("name_tracuu").innerHTML = snapshot.val().name;
					  document.getElementById("chuyenmon_tracuu").innerHTML = snapshot.val().chuyenmon;
					  document.getElementById("hocvi_tracuu").innerHTML = snapshot.val().hocvi;
					  document.getElementById("address_tracuu").innerHTML= snapshot.val().address;
					  document.getElementById("phone_tracuu").innerHTML = snapshot.val().phone;
					  document.getElementById("gender_tracuu").innerHTML = snapshot.val().gender;
					  document.getElementById("dateofbirth_tracuu").innerHTML = snapshot.val().dateofbirth;
					  document.getElementById("specialization_tracuu").innerHTML = snapshot.val().specialization;
					}
				})
			});

			document.getElementById("update").addEventListener("click", function() {
				var name = document.getElementById("name").value;
				var chuyenmon= document.getElementById("chuyenmon").value;
				var hocvi = document.getElementById("hocvi").value;
				var phone = document.getElementById("phone").value;
				var address = document.getElementById("address").value;
				var gender = document.getElementById("gender").value;
				var dateofbirth = document.getElementById("dateofbirth").value;
				var specialization = document.getElementById("specialization").value;
				update(ref(database, 'healthcares/' + user.uid), {
					email: email,
					name: name,
					phone: phone,
					address: address,
					gender: gender,
					dateofbirth: dateofbirth,
					chuyenmon: chuyenmon,
					hocvi: hocvi,
					specialization: specialization
				  });
			  alert("Cập nhật thông tin thành công!!");
			  document.getElementById("formupdate").style.display = "none";
			  });


			document.getElementById("mypatient").addEventListener("click", function() {
				document.getElementById("listpatient").style.display = "block";
				
			  });
			  var check = 0;
			document.getElementById("getdata").addEventListener("click", function() {
				if(check == 1) { return;}
				var table = document.getElementById("listpatienttable");
				get(ref(database, 'users/')).then((snapshot) => {
					if (snapshot.exists()) {
						console.log(snapshot.val());
						var data = snapshot.val();
						var i = 0;
						for (var key in data) {
							var flag = 0;
							if(data[key].yourhealthcare == user.uid) {
								var row = table.insertRow(i);
								var cell0 = row.insertCell(0);
								var cell1 = row.insertCell(1);
								var cell2 = row.insertCell(2);
								var cell3 = row.insertCell(3);
								var cell4 = row.insertCell(4);
								cell0.innerHTML = i+1;
								cell1.innerHTML = data[key].name;
								cell2.innerHTML = data[key].phone;
								cell3.innerHTML = data[key].dateofbirth;
							//create button
								var button = document.createElement("button");
								button.innerHTML = "Xem chi tiết";
								button.type="button";
								button.id = key;
								cell4.appendChild(button);
								i++;
							}
						
							document.getElementById(key).addEventListener("click", function() {
								var id = this.id;
								flag = 1;
								get(ref(database, 'users/' + id)).then((snapshot) => {
									if (snapshot.exists()) {
										document.getElementById("tracuu_thongtin").style.display = "block";
										document.getElementById("name_patient").innerHTML = snapshot.val().name;
										document.getElementById("phone_patient").innerHTML = snapshot.val().phone;
										document.getElementById("dateofbirth_patient").innerHTML = snapshot.val().dateofbirth;
										document.getElementById("gender_patient").innerHTML = snapshot.val().gender;
										document.getElementById("date_patient").innerHTML = snapshot.val().date;
										document.getElementById("time_patient").innerHTML = snapshot.val().time;
										document.getElementById("specialization_patient").innerHTML = snapshot.val().specialization;
										document.getElementById("status_patient").innerHTML = snapshot.val().status;
										document.getElementById("chandoan_patient").innerHTML = snapshot.val().chandoan;
										document.getElementById("dieutri_patient").innerHTML = snapshot.val().dieutri;
										//create button
										document.getElementById('capnhat_input').style.display = 'block';
										document.getElementById('userid').innerHTML= id;
										
									}
								})
								
							});
						}
						document.getElementById("capnhat").addEventListener("click", function() {
							var getid = document.getElementById('userid').innerHTML.valueOf();
							var chandoan = document.getElementById("chandoan_input").value;
							var dieutri = document.getElementById("dieutri_input").value;
							update(ref(database, 'users/' + getid), {
								status: "Đã khám",
								chandoan: chandoan,
								dieutri: dieutri
							});
							alert("Cập nhật thành công!!");
							document.getElementById("chandoan_input").value = "";
							document.getElementById("dieutri_input").value = "";
							document.getElementById("tracuu_thongtin").style.display = "none";
						})
					}
				});
				check++;
			});
			document.getElementById("hidden").addEventListener("click", function() {
				var table = document.getElementById("listpatienttable");
				var message = document.getElementById("name_patient");
				document.getElementById("tracuu_thongtin").style.display = "none";
				table.innerHTML = "";
				message.innerHTML = "";
				check--;
			})
			

			  

		  })
		  .catch((error) => {
		    const errorCode = error.code;
		    const errorMessage = error.message;
		    console.log(errorMessage);
		    alert(error);
		  });
		}
	  });

	  document.getElementById("logout").addEventListener("click", function() {
		signOut(auth).then(() => {
			alert("Đăng xuất thành công!!");
		});
		location.reload();
	  });
	
	
		


	  //----- End
