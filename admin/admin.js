// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, set, ref,get, update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"; // Import the getDatabase function from the firebase-database module
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
			
			// document.getElementById('createaccount').style.display = 'block';
			// document.getElementById('listhealthcare').style.display = 'block';
			// document.getElementById('listpatient').style.display = 'block';
			
			document.getElementById("createaccount").addEventListener("click", function() {
				document.getElementById('registerhealthcare').style.display = 'flex';
				document.getElementById('list_healthcare').style.display = 'none';
				document.getElementById('list_patient').style.display = 'none';
				document.getElementById('Nhapkho').style.display = 'none';
				document.getElementById('Medsreg').style.display = 'none';
				document.getElementById('Machine').style.display = 'none';
				document.getElementById('tracuu_thuoc').style.display = 'none';
				document.getElementById('tracuu_thietbi').style.display = 'none';
				document.getElementById("lichsubenhan").style.display = "none";
			});
			document.getElementById("listhealthcare").addEventListener("click", function() {
				document.getElementById('registerhealthcare').style.display = 'none';
				document.getElementById('list_healthcare').style.display = 'block';
				document.getElementById('list_patient').style.display = 'none';
				document.getElementById('Nhapkho').style.display = 'none';
				document.getElementById('Medsreg').style.display = 'none';
				document.getElementById('Machine').style.display = 'none';
				document.getElementById('tracuu_thuoc').style.display = 'none';
				document.getElementById('tracuu_thietbi').style.display = 'none';
				document.getElementById("lichsubenhan").style.display = "none";
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
			document.getElementById("listpatient").addEventListener("click", function() {
				document.getElementById('registerhealthcare').style.display = 'none';
				document.getElementById('list_healthcare').style.display = 'none';
				document.getElementById('list_patient').style.display = 'block';
				document.getElementById('Nhapkho').style.display = 'none';
				document.getElementById('Nhapkho').style.display = 'none';
				document.getElementById('Medsreg').style.display = 'none';
				document.getElementById('Machine').style.display = 'none';
				document.getElementById('tracuu_thuoc').style.display = 'none';
				document.getElementById('tracuu_thietbi').style.display = 'none';
				document.getElementById("lichsubenhan").style.display = "none";
				if(check_patient == 1) {return;}
				get(ref(database, 'users/')).then((snapshot) => {
					if(snapshot.val()) {
						var data = snapshot.val();
						var table = document.getElementById("listpatienttable");
						var i = 0;
						var check_history=0;
						for(var key in data) {
							var row = table.insertRow(i);
							var cell1 = row.insertCell(0);
							var cell2 = row.insertCell(1);
							var cell3 = row.insertCell(2);
							var cell4 = row.insertCell(3);
							var cell5 = row.insertCell(4);
							var cell6 = row.insertCell(5);
							var cell7 = row.insertCell(6);
							cell1.innerHTML = i+1;
							cell2.innerHTML = data[key].name;
							cell3.innerHTML = data[key].gender;
							cell4.innerHTML = data[key].dateofbirth;
							cell5.innerHTML = data[key].phone;
							cell6.innerHTML = data[key].address;
							var button = document.createElement("button");
							button.innerHTML = "Xem chi tiết";
							button.type="button";
							button.id = key;
							cell7.appendChild(button);
							i++;

							document.getElementById(key).addEventListener("click", function() {
								check_history=0;
								var table = document.getElementById("table_history");
								table.innerHTML=""; 
								var id = this.id;
								document.getElementById("lichsubenhan").style.display = "block";
								get(ref(database, 'users/' + id)).then((snapshot) => {
									document.getElementById("userid").innerHTML = id;
									document.getElementById("name_lichsu").innerHTML = snapshot.val().name;
								});
								if(check_history==1) return;
								var table = document.getElementById("table_history");
								get(ref(database, 'users/' +id+'/history/')).then((snapshot) => {
								var data = snapshot.val();
								var i = 0;
									for (var key in data) {
										var row = table.insertRow(i);
										var cell1 = row.insertCell(0);
										var cell2 = row.insertCell(1);
										var cell3 = row.insertCell(2);
										var cell4 = row.insertCell(3);
										var cell5 = row.insertCell(4);
										var cell6 = row.insertCell(5);
										var cell7 = row.insertCell(6);
										var cell8 = row.insertCell(7);
										cell1.innerHTML = data[key].date;
										cell2.innerHTML = data[key].time;
										cell3.innerHTML = data[key].specialization;
										cell4.innerHTML = data[key].yourhealthcare;
										cell5.innerHTML = data[key].status;
										cell6.innerHTML = data[key].xetnghiem_mau;
										cell7.innerHTML = data[key].chandoan;
										cell8.innerHTML = data[key].dieutri;
										i++;
									}
								});
								check_history=1;
								
							});
						}
					}
				})
				check_patient=1;

			});
			document.getElementById("manager_med").addEventListener("click", function() {
				document.getElementById('registerhealthcare').style.display = 'none';
				document.getElementById('list_healthcare').style.display = 'none';
				document.getElementById('list_patient').style.display = 'none';
				document.getElementById('Nhapkho').style.display = 'block';
				document.getElementById('Medsreg').style.display = 'none';
				document.getElementById('Machine').style.display = 'none';
				document.getElementById('tracuu_thuoc').style.display = 'none';
				document.getElementById('tracuu_thietbi').style.display = 'none';
				document.getElementById("lichsubenhan").style.display = "none";
			});
			document.getElementById("option_kho_button").addEventListener("click", function() {
				if(document.getElementById('option_kho').value == "Input_Med") {
					document.getElementById('Medsreg').style.display = 'block';
					document.getElementById('Machine').style.display = 'none';
					document.getElementById('tracuu_thuoc').style.display = 'block';
					document.getElementById('tracuu_thietbi').style.display = 'none';
					if(check_med==1) return;
				 	get(ref(database, 'Medicines/')).then((snapshot) => {
					 	check_med=1;
					 	var data = snapshot.val();
					 	var table = document.getElementById("tablemed");
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
						 	cell1.innerHTML = i+1;
						 	cell2.innerHTML = key;
						 	cell3.innerHTML = data[key].name;
						 	cell4.innerHTML = data[key].quantity;
						 	cell5.innerHTML = data[key].type;
						 	cell6.innerHTML = data[key].shelf;
							getExpire(data[key].expiry,cell7);
						 	i++;
					 	}
				 	}); 
				}
				if(document.getElementById('option_kho').value == "Input_Machine") {
					document.getElementById('Medsreg').style.display = 'none';
					document.getElementById('Machine').style.display = 'block';
					document.getElementById('tracuu_thuoc').style.display = 'none';
					document.getElementById('tracuu_thietbi').style.display = 'block';
					if(check_machine==1) return;
				 	get(ref(database, 'Machines/')).then((snapshot) => {
					 	check_machine=1;
					 	var data = snapshot.val();
					 	var table = document.getElementById("tablemachine");
					 	var i = 0;
					 	for(var key in data) {
						 	var row = table.insertRow(i);
						 	var cell1 = row.insertCell(0);
						 	var cell2 = row.insertCell(1);
						 	var cell3 = row.insertCell(2);
						 	var cell4 = row.insertCell(3);
						 	var cell5 = row.insertCell(4);
						 	var cell6 = row.insertCell(5);
						 	cell1.innerHTML = i+1;
						 	cell2.innerHTML = key;
						 	cell3.innerHTML = data[key].name;
						 	cell4.innerHTML = data[key].quantity;;
						 	cell5.innerHTML = data[key].shelf;
						 	getExpire(data[key].expiry,cell6);
						 	i++;
					 	}
				 	}); 
				}
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
						var check_history=0;
						for(var key in data) {
							var row = table.insertRow(i);
							var cell1 = row.insertCell(0);
							var cell2 = row.insertCell(1);
							var cell3 = row.insertCell(2);
							var cell4 = row.insertCell(3);
							var cell5 = row.insertCell(4);
							var cell6 = row.insertCell(5);
							var cell7 = row.insertCell(6);
							cell1.innerHTML = i+1;
							cell2.innerHTML = data[key].name;
							cell3.innerHTML = data[key].gender;
							cell4.innerHTML = data[key].dateofbirth;
							cell5.innerHTML = data[key].phone;
							cell6.innerHTML = data[key].address;
							var button = document.createElement("button");
							button.innerHTML = "Xem chi tiết";
							button.type="button";
							button.id = key;
							cell7.appendChild(button);
							i++;

							document.getElementById(key).addEventListener("click", function() {
								check_history=0;
								var table = document.getElementById("table_history");
								table.innerHTML=""; 
								var id = this.id;
								document.getElementById("lichsubenhan").style.display = "block";
								get(ref(database, 'users/' + id)).then((snapshot) => {
									document.getElementById("userid").innerHTML = id;
									document.getElementById("name_lichsu").innerHTML = snapshot.val().name;
								});
								if(check_history==1) return;
								var table = document.getElementById("table_history");
								get(ref(database, 'users/' +id+'/history/')).then((snapshot) => {
								var data = snapshot.val();
								var i = 0;
									for (var key in data) {
										var row = table.insertRow(i);
										var cell1 = row.insertCell(0);
										var cell2 = row.insertCell(1);
										var cell3 = row.insertCell(2);
										var cell4 = row.insertCell(3);
										var cell5 = row.insertCell(4);
										var cell6 = row.insertCell(5);
										var cell7 = row.insertCell(6);
										var cell8 = row.insertCell(7);
										cell1.innerHTML = data[key].date;
										cell2.innerHTML = data[key].time;
										cell3.innerHTML = data[key].specialization;
										cell4.innerHTML = data[key].yourhealthcare;
										cell5.innerHTML = data[key].status;
										cell6.innerHTML = data[key].xetnghiem_mau;
										cell7.innerHTML = data[key].chandoan;
										cell8.innerHTML = data[key].dieutri;
										i++;
									}
								});
								check_history=1;
								
							});
						}
					}
				})
				check_patient=1;
			});
			document.getElementById("hidden_patient").addEventListener("click", function() {
				document.getElementById("lichsubenhan").style.display = "none";
				var table = document.getElementById("listpatienttable");
				table.innerHTML = "";
				check_patient = 0;
				check_history=0;
			})
			document.getElementById("MedUpdate").addEventListener("click", function() {
				update(ref(database, 'Medicines/' + document.getElementById("MedID").value), {
				 name: document.getElementById("MedName").value,
				 quantity: document.getElementById("MedQuantity").value,
				 type: document.getElementById("MedType").value,
				 shelf: document.getElementById("MedShelf").value,
				 expiry: document.getElementById("MedExpiry").value
				});
				alert("Nhập kho thành công!!");
			 });
			 function getExpire(expiry,cell7) {
			   var countDownDate = new Date(expiry).getTime();
						 var x = setInterval(function() {
						 var now = new Date().getTime();
						 var distance = countDownDate - now;
						 var days = Math.floor(distance / (1000 * 60 * 60 * 24));
						 var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
						 var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
						 var seconds = Math.floor((distance % (1000 * 60)) / 1000);
						 if (distance < 0) {
						 clearInterval(x);
						 cell7.innerHTML = "Hết hạn sử dụng";
						 }
						 else {
						   cell7.innerHTML = days + " ngày " + hours + " giờ " + minutes + " phút " + seconds + " giây ";
						 }
						 }, 1000);
			 
			 }
			 var check_med = 0;
			 document.getElementById("getMed").addEventListener("click", function() {
				if(check_med==1) return;
				get(ref(database, 'Medicines/')).then((snapshot) => {
					check_med=1;
					var data = snapshot.val();
					var table = document.getElementById("tablemed");
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
						cell1.innerHTML = i+1;
						cell2.innerHTML = key;
						cell3.innerHTML = data[key].name;
						cell4.innerHTML = data[key].quantity;
						cell5.innerHTML = data[key].type;
						cell6.innerHTML = data[key].shelf;
						getExpire(data[key].expiry,cell7);
						i++;
					}
				}); 
			 });
			 document.getElementById("hiddenMed").addEventListener("click", function() {
			   check_med=0;
			   var table = document.getElementById("tablemed");
			   table.innerHTML="";
			 });
			 document.getElementById("delMed").addEventListener("click", function() {
				get(ref(database, 'Medicines/')).then((snapshot) => {
					if(snapshot.val()) {
						var data = snapshot.val();
						for(var key in data) {
							if(key==document.getElementById("MedID_xoa").value) {
								set(ref(database, 'Medicines/' + key), null);
								alert("Xóa thành công");
								return;
							}
						}
						alert("Không tìm thấy ID thuốc, vui lòng nhập lại");
					}

				});
			  });


			  document.getElementById("MachineUpdate").addEventListener("click", function() {
				update(ref(database, 'Machines/' + document.getElementById("MachineID").value), {
				 name: document.getElementById("MachineName").value,
				 quantity: document.getElementById("MachineQuantity").value,
				 shelf: document.getElementById("MachineShelf").value,
				 expiry: document.getElementById("MachineExpiry").value
				});
				alert("Nhập kho thành công!!");
			 });


			 var check_machine = 0;
			 document.getElementById("getMachine").addEventListener("click", function() {
			   if(check_machine==1) return;
				 get(ref(database, 'Machines/')).then((snapshot) => {
					 check_machine=1;
					 var data = snapshot.val();
					 var table = document.getElementById("tablemachine");
					 var i = 0;
					 for(var key in data) {
						 var row = table.insertRow(i);
						 var cell1 = row.insertCell(0);
						 var cell2 = row.insertCell(1);
						 var cell3 = row.insertCell(2);
						 var cell4 = row.insertCell(3);
						 var cell5 = row.insertCell(4);
						 var cell6 = row.insertCell(5);
						 cell1.innerHTML = i+1;
						 cell2.innerHTML = key;
						 cell3.innerHTML = data[key].name;
						 cell4.innerHTML = data[key].quantity;;
						 cell5.innerHTML = data[key].shelf;
						 getExpire(data[key].expiry,cell6);
						 i++;
					 }
				 }); 
			 });
			 document.getElementById("hiddenMachine").addEventListener("click", function() {
			   check_machine=0;
			   var table = document.getElementById("tablemachine");
			   table.innerHTML="";
			 });
			 document.getElementById("delMachine").addEventListener("click", function() {
				get(ref(database, 'Machines/')).then((snapshot) => {
					if(snapshot.val()) {
						var data = snapshot.val();
						for(var key in data) {
							if(key==document.getElementById("MachineID_xoa").value) {
								set(ref(database, 'Machines/' + key), null);
								alert("Xóa thành công");
								return;
							}
						}
						alert("Không tìm thấy ID thiết bị, vui lòng nhập lại");
					}

				});
			  });

			
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

	  document.getElementById("logout").addEventListener("click", function() {

		signOut(auth).then(() => {
			alert("Đăng xuất thành công!!");
		});
		location.reload();

	});
	
	
		


	  //----- End
