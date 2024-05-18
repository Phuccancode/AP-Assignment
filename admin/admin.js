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

var check_page = 0;

var check_health = 0;
var check_patient = 0;
var check_history = 0;
var check_med = 0;
var check_machine = 0;

document.getElementById('content').style.background = '#010824';

document.getElementById("login").addEventListener("click", function() {
var email =  document.getElementById("email").value;
var password = document.getElementById("password").value;
if(email=="admin@gmail.com"){
	signInWithEmailAndPassword(auth, email, password)
	.then((userCredential) => {
	// Signed in 
	if (check_page == 1) {}
	else {
		check_page = 1;
		const user = userCredential.user;
		console.log(user);
		document.getElementById('login-admin').style.display = 'none';
		//print on web page
		alert("Bạn đã đăng nhập thành công với quyền quản trị viên")
		document.getElementById('slide-menu').style.display = 'block';
		document.getElementsByClassName('menu-trigger')[0].style.display = 'inline-block';
		document.getElementById('banner').style.display = 'block';
		document.getElementById('content').style.padding = '0px 0px';
		// document.getElementById('createaccount').style.display = 'block';
		// document.getElementById('listhealthcare').style.display = 'block';
		// document.getElementById('listpatient').style.display = 'block';

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
				document.getElementById("show-hide-health").innerHTML = "Ẩn";
			}
		})
		check_health = 1;

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
						var id = this.id;
						get(ref(database, 'users/' + id)).then((snapshot) => {
							
							if (snapshot.exists()) {
								document.getElementById('userid').innerHTML= id;

								document.getElementById("patient-container").style.display = "block";
								document.getElementById("name_lichsu").innerHTML = snapshot.val().name;
								if (check_history == 1) {return;}
								var table = document.getElementById("table_history");
								table.innerHTML = "";
								var getid = document.getElementById('userid').innerHTML.valueOf();
								get(ref(database, 'users/' + getid+'/history/')).then((snapshot) => {
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
										var cell9 = row.insertCell(8);
										cell1.innerHTML = data[key].date;
										cell2.innerHTML = data[key].time;
										cell3.innerHTML = data[key].specialization;
										cell4.innerHTML = data[key].yourhealthcare;
										cell5.innerHTML = data[key].status;
										cell6.innerHTML = data[key].xetnghiem_mau;
										cell7.innerHTML = data[key].chup_xquang;
										cell8.innerHTML = data[key].chandoan;
										cell9.innerHTML = data[key].dieutri;
										i++;
									}
									if (table.innerHTML == "") {
										document.getElementById("get_history").innerHTML = "Không có";	
									}
									else {
										document.getElementById("history-header").style.borderBottom = "0.5px solid #8b5f00";
										document.getElementById("get_history").innerHTML = "Thu gọn";
									}
								});
								check_history=1;
							}
						});
					});
				}
				document.getElementById("show-hide-patient").innerHTML = "Ẩn";
			}
		})
		check_patient = 1;

		get(ref(database, 'Medicines/')).then((snapshot) => {
			check_med = 1;
			var data = snapshot.val();
			var table = document.getElementById("tablemed");
			table.innerHTML = "";
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
			if (table.innerHTML == "") document.getElementById("getMed").innerHTML = "Kho trống";
			else {
				document.getElementById("getMed").innerHTML = "Tải lại danh sách";
				document.getElementById("thuoc-header").style.borderBottom = "0.5px solid #8b5f00";
			}
		});

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
			if (table.innerHTML == "") document.getElementById("getMachine").innerHTML = "Kho trống";
			else {
				document.getElementById("getMachine").innerHTML = "Tải lại danh sách";
				document.getElementById("thietbi-header").style.borderBottom = "0.5px solid #8b5f00";
			}
		});
		
		document.getElementById("createaccount").addEventListener("click", function() {
			document.getElementById('registerhealthcare').style.display = 'flex';
			document.getElementById('list_healthcare').style.display = 'none';
			document.getElementById('list_patient').style.display = 'none';
			document.getElementById('khothuoc-container').style.display = 'none';
			document.getElementById("patient-container").style.display = "none";
			document.getElementById('banner').style.display = 'none';
			document.getElementById('content').style.overflow = 'hidden';
			document.getElementById('content').style.background = '#010824';
			document.getElementById('schedule_admin').style.display = 'none';
			document.getElementById('search_healthcare').style.display = 'none';
			
		});
		document.getElementById("listhealthcare").addEventListener("click", function() {
			document.getElementById('registerhealthcare').style.display = 'none';
			document.getElementById('list_healthcare').style.display = 'block';
			document.getElementById('list_patient').style.display = 'none';
			document.getElementById('khothuoc-container').style.display = 'none';
			document.getElementById("patient-container").style.display = "none";
			document.getElementById('banner').style.display = 'none';
			document.getElementById('content').style.padding = '40px';
			document.getElementById('content').style.overflow = 'scroll';
			document.getElementById('schedule_admin').style.display = 'none';
			document.getElementById('search_healthcare').style.display = 'none';
		});
		document.getElementById("listpatient").addEventListener("click", function() {
			document.getElementById('registerhealthcare').style.display = 'none';
			document.getElementById('list_healthcare').style.display = 'none';
			document.getElementById('list_patient').style.display = 'block';
			document.getElementById('khothuoc-container').style.display = 'none';
			document.getElementById("patient-container").style.display = "none";
			document.getElementById('banner').style.display = 'none';
			document.getElementById('content').style.padding = '40px';
			document.getElementById('content').style.overflow = 'scroll';
			document.getElementById('schedule_admin').style.display = 'none';
			document.getElementById('search_healthcare').style.display = 'none';
		});
		document.getElementById("manager_med").addEventListener("click", function() {
			document.getElementById('registerhealthcare').style.display = 'none';
			document.getElementById('list_healthcare').style.display = 'none';
			document.getElementById('list_patient').style.display = 'none';
			document.getElementById('khothuoc-container').style.display = 'block';
			document.getElementById("patient-container").style.display = "none";
			document.getElementById('banner').style.display = 'none';
			document.getElementById('content').style.padding = '40px';
			document.getElementById('content').style.overflow = 'scroll';
			document.getElementById('thuoc-container').style.display = 'block';
			document.getElementById('thietbi-container').style.display = 'none';
			document.getElementById('schedule_admin').style.display = 'none';
			document.getElementById('search_healthcare').style.display = 'none';
		});

		document.getElementById("option_kho_button").addEventListener("click", function() {
			if(document.getElementById('option_kho').value == "Input_Med") {
				document.getElementById('thuoc-container').style.display = 'block';
				document.getElementById('thietbi-container').style.display = 'none';
			}
			if(document.getElementById('option_kho').value == "Input_Machine") {
				document.getElementById('thuoc-container').style.display = 'none';
				document.getElementById('thietbi-container').style.display = 'block';
			}
		});
		
		document.getElementById("schedule").addEventListener("click", function() {
			document.getElementById('registerhealthcare').style.display = 'none';
			document.getElementById('list_healthcare').style.display = 'none';
			document.getElementById('list_patient').style.display = 'none';
			document.getElementById('khothuoc-container').style.display = 'none';
			document.getElementById("patient-container").style.display = "none";
			document.getElementById('banner').style.display = 'none';
			document.getElementById('content').style.padding = '40px';
			document.getElementById('content').style.overflow = 'scroll';
			document.getElementById('thuoc-container').style.display = 'none';
			document.getElementById('thietbi-container').style.display = 'none';
			document.getElementById('schedule_admin').style.display = 'block';
			var curr = new Date;
			var first = curr.getDate() - curr.getDay()+1
			var last = first + 6;
			var firstday = new Date(curr.setDate(first)).toLocaleDateString('vi-VN');
			var lastday = new Date(curr.setDate(last)).toLocaleDateString('vi-VN');
			document.getElementById('showdateofweek').innerHTML = "Lịch làm việc từ " + firstday + " đến " + lastday;
			document.getElementById('search_healthcare').style.display = 'none';
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
		
		document.getElementById("show-hide-health").addEventListener("click", function() {
			if(check_health == 1) {
				var table = document.getElementById("listhealthcaretable");
				table.innerHTML = "";
				document.getElementById("show-hide-health").innerHTML = "Hiện";
				check_health = 0;
			}
			else {
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
						document.getElementById("show-hide-health").innerHTML = "Ẩn";
					}
				})
				check_health = 1;
			}
		});

		document.getElementById("show-hide-patient").addEventListener("click", function() {
			if(check_patient == 1) {
				document.getElementById("patient-container").style.display = "none";
				var table = document.getElementById("listpatienttable");
				table.innerHTML = "";
				document.getElementById("show-hide-patient").innerHTML = "Hiện";
				check_patient = 0;
			}
			else {
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
								var id = this.id;
								get(ref(database, 'users/' + id)).then((snapshot) => {
									if (snapshot.exists()) {
										document.getElementById('userid').innerHTML= id;

										document.getElementById('patient-container').style.display = "block";
										document.getElementById("name_lichsu").innerHTML = snapshot.val().name;
										if (check_history == 1) {return;}
										var table = document.getElementById("table_history");
										table.innerHTML = "";
										var getid = document.getElementById('userid').innerHTML.valueOf();
										get(ref(database, 'users/' + getid+'/history/')).then((snapshot) => {
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
												var cell9 = row.insertCell(8);
												cell1.innerHTML = data[key].date;
												cell2.innerHTML = data[key].time;
												cell3.innerHTML = data[key].specialization;
												cell4.innerHTML = data[key].yourhealthcare;
												cell5.innerHTML = data[key].status;
												cell6.innerHTML = data[key].xetnghiem_mau;
												cell7.innerHTML = data[key].chup_xquang;
												cell8.innerHTML = data[key].chandoan;
												cell9.innerHTML = data[key].dieutri;
												i++;
											}
											if (table.innerHTML == "") {
												document.getElementById("get_history").innerHTML = "Không có";	
											}
											else {
												document.getElementById("history-header").style.borderBottom = "0.5px solid #8b5f00";
												document.getElementById("get_history").innerHTML = "Thu gọn";
											}
										});
										check_history=1;
									}
								});
							});
						}
						document.getElementById("show-hide-patient").innerHTML = "Ẩn";
					}
				})
				check_patient=1;
			}
		});

		document.getElementById("get_history").addEventListener("click", function() {
			if(check_history==1) {
				if (document.getElementById("get_history").innerHTML == "Không có") {return;}
				var table = document.getElementById("table_history");
				table.innerHTML = "";
				document.getElementById("history-header").style.borderBottom = "none";
				document.getElementById("get_history").innerHTML = "Xem";
				check_history=0;
			}
			else {
				var table = document.getElementById("table_history");
				table.innerHTML = "";
				var getid = document.getElementById('userid').innerHTML.valueOf();
				get(ref(database, 'users/' + getid+'/history/')).then((snapshot) => {
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
					var cell9 = row.insertCell(8);
					cell1.innerHTML = data[key].date;
					cell2.innerHTML = data[key].time;
					cell3.innerHTML = data[key].specialization;
					cell4.innerHTML = data[key].yourhealthcare;
					cell5.innerHTML = data[key].status;
					cell6.innerHTML = data[key].xetnghiem_mau;
					cell7.innerHTML = data[key].chup_xquang;
					cell8.innerHTML = data[key].chandoan;
					cell9.innerHTML = data[key].dieutri;
					i++;
				}
				if (table.innerHTML == "") {
					document.getElementById("get_history").innerHTML = "Không có";	
				}
				else {
					document.getElementById("history-header").style.borderBottom = "0.5px solid #8b5f00";
					document.getElementById("get_history").innerHTML = "Thu gọn";
				}
			});
			check_history=1;
			}
		}); 

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
			}}, 1000);
			}

		document.getElementById("getMed").addEventListener("click", function() {
			if(check_med==1) {
				if (document.getElementById("getMed").innerHTML == "Kho trống") {return;}
				var table = document.getElementById("tablemed");
				table.innerHTML = "";
				document.getElementById("getMed").innerHTML = "Tải lại danh sách";
				document.getElementById("thuoc-header").style.borderBottom = "none";
				check_med = 0;
			}
			get(ref(database, 'Medicines/')).then((snapshot) => {
				check_med = 1;
				var data = snapshot.val();
				var table = document.getElementById("tablemed");
				table.innerHTML = "";
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
				document.getElementById("getMed").innerHTML = "Tải lại danh sách";
			}); 	
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

		document.getElementById("getMachine").addEventListener("click", function() {
			if(check_machine==1) {
				if (document.getElementById("getMachine").innerHTML == "Kho trống") {return;}
				var table = document.getElementById("tablemachine");
				table.innerHTML = "";
				document.getElementById("getMachine").innerHTML = "Tải lại danh sách";
				document.getElementById("thietbi-header").style.borderBottom = "none";
				check_machine = 0;
			}
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
				document.getElementById("getMachine").innerHTML = "Tải lại danh sách";
			}); 
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

					
		document.getElementById('getschedule').addEventListener('click', function(){
			// var selectType = document.getElementById('select-type');
			// var option = document.createElement('option');
			// option.text = 'Nguyễn Văn A';
			// selectType.add(option);
			get(ref(database, 'schedule/')).then((snapshot) => {
				var data = snapshot.val();
				for(var key in data) {
					if(data[key] == "") continue;
					document.getElementById(key).innerHTML = data[key];
				}
			});
		});

		

		document.querySelector('.schedule_container').addEventListener('click', function(e){
			document.querySelector('.form_container').style.display = "block";
			var option = document.createElement('option');
			option.text = "Chọn khoa trước đi";
			document.getElementById('select-doctor').add(option);
			document.querySelector('.select-type').addEventListener('change', function(){
				
				var chuyenkhoa = document.getElementById('select-type').value;
				var flag = 0;
				get(ref(database, 'healthcares/')).then((snapshot) => {
					var data = snapshot.val();
					document.getElementById('select-doctor').innerHTML = "";
					for(var key in data) {
						if(chuyenkhoa == data[key].specialization) {
							var option = document.createElement('option');
							option.text = data[key].name;
							option.id=key;
							document.getElementById('select-doctor').add(option);
							flag=1;
						}
						else continue;
					}
					if(flag==0) {
						var option = document.createElement('option');
						option.text = "Khoa không có nhân viên";
						document.getElementById('select-doctor').add(option);
					}
				})
			});
			document.getElementById('idtask').innerHTML=e.target.id;
		})
		document.getElementById('Done').addEventListener('click', function(){
			var opvar = document.getElementById('select-doctor').value;
			var id = document.getElementById('idtask').innerHTML.valueOf();
			document.getElementById(id).innerHTML += `<br>${opvar}`;
			document.querySelector('.form_container').style.display = "none";
			document.getElementById('select-doctor').innerHTML = "";
			
		})
		document.getElementById('xoa_schedule').addEventListener('click', function(){
			var id = document.getElementById('idtask').innerHTML.valueOf();
			document.getElementById(id).innerHTML ="";
			document.querySelector('.form_container').style.display = "none";
			document.getElementById('select-doctor').innerHTML = "";
			
		})
		document.querySelector('.close_but').addEventListener("click", function(){
			document.querySelector('.form_container').style.display = "none";
			document.getElementById('select-doctor').innerHTML = "";
		});
		document.getElementById('update_schedule').addEventListener('click', function(){
			update(ref(database, 'schedule/'), {
				task1: document.getElementById('task1').innerHTML,
				task2: document.getElementById('task2').innerHTML,
				task3: document.getElementById('task3').innerHTML,
				task4: document.getElementById('task4').innerHTML,
				task5: document.getElementById('task5').innerHTML,
				task6: document.getElementById('task6').innerHTML,
				task7: document.getElementById('task7').innerHTML,
				task8: document.getElementById('task8').innerHTML,
				task9: document.getElementById('task9').innerHTML,
				task10: document.getElementById('task10').innerHTML,
				task11: document.getElementById('task11').innerHTML,
				task12: document.getElementById('task12').innerHTML,
				task13: document.getElementById('task13').innerHTML,
				task14: document.getElementById('task14').innerHTML,
				task15: document.getElementById('task15').innerHTML,
				task16: document.getElementById('task16').innerHTML,
				task17: document.getElementById('task17').innerHTML,
				task18: document.getElementById('task18').innerHTML,
				task19: document.getElementById('task19').innerHTML,
				task20: document.getElementById('task20').innerHTML,
				task21: document.getElementById('task21').innerHTML,
				task22: document.getElementById('task22').innerHTML,
				task23: document.getElementById('task23').innerHTML,
				task24: document.getElementById('task24').innerHTML,
				task25: document.getElementById('task25').innerHTML,
				task26: document.getElementById('task26').innerHTML,
				task27: document.getElementById('task27').innerHTML,
				task28: document.getElementById('task28').innerHTML,
			});
			alert("Update success!");
		});
	}
	
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
