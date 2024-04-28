
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

	  document.getElementById('content').style.background = '#010824';
	
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
			alert("Đăng nhập thành công!!");
			get(ref(database, 'healthcares/' + user.uid)).then((snapshot) => {
				if (snapshot.exists()) {
				  document.getElementById("message").innerHTML = "Xin chào " +  snapshot.val().name;
				  document.getElementById("welcome").innerHTML = "Welcome you, " + snapshot.val().name;
				}
				else{
					alert("Vui lòng cập nhật thông tin cá nhân!!");
				}
			})

			var check = 0;
			var check_vaitro = 0;
			var check_history = 0;

			if(email.includes("hospital.bs")==true){check_vaitro=1}
			if(email.includes("hospital.yta")==true){check_vaitro=2}
			document.getElementById('container-ring').style.display = 'none';
			document.getElementById('content').style.background = 'linear-gradient(135deg, #b3beeb, #bcc6e4)';
			document.getElementById('slide-menu').style.display = 'block';
			document.getElementsByClassName('menu-trigger')[0].style.display = 'inline-block';
			document.getElementById('banner').style.display = 'block';
			document.getElementById('content').style.padding = '0px 0px';
			// document.getElementById('updateaccount').style.display = 'block';
			// document.getElementById('mypatient').style.display = 'block';
			// document.getElementById('tracuutaikhoan').style.display = 'block';

			if (check == 1) {return;}
			else {
				var header = document.getElementById("listpatientheader");
				var table = document.getElementById("listpatienttable");
				get(ref(database, 'users/')).then((snapshot) => {
					if (snapshot.exists()) {
						console.log(snapshot.val());
						var data = snapshot.val();
						var hrow = header.insertRow(0);
						var head0 = hrow.insertCell(0);
						var head1 = hrow.insertCell(1);
						var head2 = hrow.insertCell(2);
						var head3 = hrow.insertCell(3);
						var head4 = hrow.insertCell(4);
						head0.innerHTML = "STT";
						head1.innerHTML = "Họ và tên";
						head2.innerHTML = "Số điện thoại";
						head3.innerHTML = "Ngày sinh";
						head4.innerHTML = "Ngày khám bệnh";
						if(check_vaitro==1) {
							header.style.height = "56.5px";
							var head5 = hrow.insertCell(5);
							head5.innerHTML = "Chi tiết";
						}
						else if(check_vaitro==2) {
							header.style.height = "56.5px";
							head0.style.width = "3em";
							head1.style.width = "13.6em";
							head2.style.width = "8.4em";
							head3.style.width = "7em";
							head4.style.width = "8.4em";
							var head5 = hrow.insertCell(5);
							head5.style.width = "9.6em";
							head5.innerHTML = "Loại xét nghiệm";
							var head6 = hrow.insertCell(6);
							head6.style.width = "11.6em";
							head6.innerHTML = "Cập nhật xét nghiệm";
						}

						var i = 0;
						for (var key in data) {
							if(data[key].yourhealthcare == user.uid || (data[key].xetnghiem_mau=="Có"&&check_vaitro==2)) {
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
								cell4.innerHTML = data[key].date;
							//create button
								var button = document.createElement("button");
								if(check_vaitro==1) {
									button.innerHTML = "Xem chi tiết";
									var cell5 = row.insertCell(5);
									cell5.appendChild(button);
								}
								else if(check_vaitro==2) {
									var cell5 = row.insertCell(5);
									if(data[key].xetnghiem_mau=="Có"&&data[key].chup_xquang=="Có") cell5.innerHTML = "XN máu, X-Quang";
									else if(data[key].xetnghiem_mau=="Có") cell5.innerHTML = "Xét nghiệm máu";
									else if(data[key].chup_xquang=="Có") cell5.innerHTML = "Chụp x-quang";
									button.innerHTML = "Cập nhật";
									var cell6 = row.insertCell(6);
									cell6.appendChild(button);
								}
								button.type="button";
								button.id = key;
								i++;
								document.getElementById("show-hide").innerHTML = "Ẩn";
							}
							else continue;
						
							document.getElementById(key).addEventListener("click", function() {
								check_history=0;
								var id = this.id;
								get(ref(database, 'users/' + id)).then((snapshot) => {
									if (snapshot.exists()) {
										document.getElementById('userid').innerHTML = id;
										
										if(check_vaitro==1){
											document.getElementById("patient-container").style.display = "block";
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
											document.getElementById("ngayxetnghiem").innerHTML = snapshot.val().date;
											document.getElementById("xraydate").innerHTML = snapshot.val().date;
											//create button
											document.getElementById('capnhat_input').style.display = 'block';
											document.getElementById('lichsubenhan').style.display = 'block';

											if (check_history == 1) {return;}
											var table = document.getElementById("table_history");
											table.innerHTML = "";
											var getid = document.getElementById('userid').innerHTML.valueOf();
											get(ref(database, 'users/' + getid +'/history/')).then((snapshot) => {
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
													cell6.innerHTML = data[key].chandoan;
													cell7.innerHTML = data[key].dieutri;
													if(data[key].xetnghiem_mau=="Có"||data[key].chup_xquang=="Có") cell8.innerHTML="Có";
													else cell8.innerHTML="Không";
													var button = document.createElement("button");
													button.innerHTML = "Xem";
													button.type="button";
													button.id = key;
													cell9.appendChild(button);
													i++;;
													document.getElementById(key).addEventListener("click", function(){
														id = document.getElementById('userid').innerHTML;
														if(data[key].xetnghiem_mau=="Có" && check_vaitro==1) {
															document.getElementById("ketquaxetnghiem").style.display = "block";
															document.getElementById("xetnghiem-header").style.borderBottom = "0.5px solid #8b5f00";
															get(ref(database, 'users/' + id +'/xetnghiemmau/'+ data[key].date)).then((snapshot) => {
																if(snapshot.val()){
																	var data_1 = snapshot.val();
																	var i = 1;
																	
																	for (var key_1 in data_1) {
																		document.getElementById("xetnghiemmau"+i).innerHTML = data_1[key_1];
																		i++;
																	}
																}
																else {
																	alert("Chưa có kết quả xét nghiệm!!!");
																	//Reload data in table
																	var l = 1;
																	while(document.getElementById("xetnghiemmau"+l)) {
																	document.getElementById("xetnghiemmau"+l).innerHTML = "Đang chờ";
																	l++;
																	}
																}
															});
														}
														else {
															document.getElementById("ketquaxetnghiem").style.display = "none";
														}
													
														if(data[key].chup_xquang=="Có"&&check_vaitro==1) {
															document.getElementById("xrayres").style.display = "block";
															get(ref(database, 'users/' + id +'/xquang/'+ data[key].date)).then((snapshot) => {
																if(snapshot.val()){
																		document.getElementById("des").innerHTML = snapshot.val().description;
																		document.getElementById("pic").src = snapshot.val().url;
																}
																else {
																		alert("Chưa có kết quả chụp!!!");
																	}
															});
														}
														else {
															document.getElementById("xrayres").style.display = "none";
														}
													});
												}
												if (table.innerHTML == "") {
													document.getElementById("get_history").innerHTML = "Không có";	
												}
												else {
													document.getElementById("history-header").style.borderBottom = "0.5px solid #8b5f00";
													document.getElementById("get_history").innerHTML = "Thu gọn";
												}
												check_history=1;
											});
										}
										else if(check_vaitro==2) {
											document.getElementById("luachon_xetnghiem").style.display = "block";
											document.getElementById("name_xetnghiem").innerHTML = snapshot.val().name;
										};
									}
									
								})
								
								
							});
							
						}
					}
				});
				check=1;
			}

			document.getElementById("updateaccount").addEventListener("click", function() {
				document.getElementById('form-container').style.display = 'block';
				document.getElementById('info-container').style.display = 'none';
				document.getElementById("listpatient").style.display = "none";
				document.getElementById("patient-container").style.display = "none";
				document.getElementById("xetnghiem_xquang-container").style.display = "none";
				document.getElementById('banner').style.display = 'none';
				document.getElementById('content').style.padding = '40px';
			});
			document.getElementById("mypatient").addEventListener("click", function() {
				document.getElementById('form-container').style.display = 'none';
				document.getElementById('info-container').style.display = 'none';
				document.getElementById("listpatient").style.display = "block";
				document.getElementById("patient-container").style.display = "none";
				document.getElementById("xetnghiem_xquang-container").style.display = "none";
				document.getElementById('banner').style.display = 'none';
				document.getElementById('content').style.padding = '40px';
			});
			document.getElementById("tracuutaikhoan").addEventListener("click", function() {
				document.getElementById('form-container').style.display = 'none';
				document.getElementById('info-container').style.display = 'block';
				document.getElementById("listpatient").style.display = "none";
				document.getElementById("patient-container").style.display = "none";
				document.getElementById("xetnghiem_xquang-container").style.display = "none";
				document.getElementById('banner').style.display = 'none';
				document.getElementById('content').style.padding = '40px';
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
				var dateofbirth = new Date(document.getElementById("dateofbirth").value).toLocaleDateString('vi-VN');
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
			  document.getElementById("form-container").style.display = "none";
			});

			document.getElementById("show-hide").addEventListener("click", function() {
				if(check == 1) { 
					var table = document.getElementById("listpatienttable");
					// var message = document.getElementById("name_patient");
					document.getElementById("patient-container").style.display = "none";
					document.getElementById("xetnghiem_xquang-container").style.display = "none";
					document.getElementById("show-hide").innerHTML = "Hiện";
					table.innerHTML = "";
					// message.innerHTML = "";
					check = 0;
				}
				else {
					var table = document.getElementById("listpatienttable");
					get(ref(database, 'users/')).then((snapshot) => {
						if (snapshot.exists()) {
							console.log(snapshot.val());
							var data = snapshot.val();
							var i = 0;
							for (var key in data) {
								if(data[key].yourhealthcare == user.uid || (data[key].xetnghiem_mau=="Có"&&check_vaitro==2)) {
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
									cell4.innerHTML = data[key].date;
								//create button
									var button = document.createElement("button");
									if(check_vaitro==1) {
										button.innerHTML = "Xem chi tiết";
										var cell5 = row.insertCell(5);
										cell5.appendChild(button);
									}
									else if(check_vaitro==2) {
										var cell5 = row.insertCell(5);
										if(data[key].xetnghiem_mau=="Có"&&data[key].chup_xquang=="Có") cell5.innerHTML = "XN máu, X-Quang";
										else if(data[key].xetnghiem_mau=="Có") cell5.innerHTML = "Xét nghiệm máu";
										else if(data[key].chup_xquang=="Có") cell5.innerHTML = "Chụp x-quang";
										button.innerHTML = "Cập nhật";
										var cell6 = row.insertCell(6);
										cell6.appendChild(button);
									}
									button.type="button";
									button.id = key;
									i++;
									document.getElementById("show-hide").innerHTML = "Ẩn";
								}
								else continue;
							
								document.getElementById(key).addEventListener("click", function() {
									var table = document.getElementById("table_history");
									table.innerHTML="";
									document.getElementById("history-header").style.borderBottom = "none";
									var id = this.id;
									get(ref(database, 'users/' + id)).then((snapshot) => {
										if (snapshot.exists()) {
											document.getElementById('userid').innerHTML= id;
											
											if(check_vaitro==1){
                                                document.getElementById("patient-container").style.display = "block";
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
                                                document.getElementById("ngayxetnghiem").innerHTML = snapshot.val().date;
												document.getElementById("xraydate").innerHTML = snapshot.val().date;
                                                //create button
                                                document.getElementById('capnhat_input').style.display = 'block';
                                                document.getElementById('lichsubenhan').style.display = 'block';
												
												var table = document.getElementById("table_history");
												table.innerHTML = "";
												var getid = document.getElementById('userid').innerHTML.valueOf();
												get(ref(database, 'users/' + getid +'/history/')).then((snapshot) => {
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
														cell6.innerHTML = data[key].chandoan;
														cell7.innerHTML = data[key].dieutri;
														if(data[key].xetnghiem_mau=="Có"||data[key].chup_xquang=="Có") cell8.innerHTML="Có";
														else cell8.innerHTML="Không";
														var button = document.createElement("button");
														button.innerHTML = "Xem";
														button.type="button";
														button.id = key;
														cell9.appendChild(button);
														i++;
														document.getElementById(key).addEventListener("click", function(){
															id = document.getElementById('userid').innerHTML;
															if(data[key].xetnghiem_mau=="Có" && check_vaitro==1) {
																document.getElementById("ketquaxetnghiem").style.display = "block";
																document.getElementById("xetnghiem-header").style.borderBottom = "0.5px solid #8b5f00";
																get(ref(database, 'users/' + id +'/xetnghiemmau/'+ data[key].date)).then((snapshot) => {
																	if(snapshot.val()){
																		var data_1 = snapshot.val();
																		var i = 1;
																		
																		for (var key_1 in data_1) {
																			document.getElementById("xetnghiemmau"+i).innerHTML = data_1[key_1];
																			i++;
																		}
																	}
																	else {
																		alert("Chưa có kết quả xét nghiệm!!!");
																		//Reload data in table
																		var l = 1;
																		while(document.getElementById("xetnghiemmau"+l)) {
																		document.getElementById("xetnghiemmau"+l).innerHTML = "Đang chờ";
																		l++;
																		}
																	}
																});
															}
															else {
																document.getElementById("ketquaxetnghiem").style.display = "none";
															}
														
															if(data[key].chup_xquang=="Có"&&check_vaitro==1) {
																document.getElementById("xrayres").style.display = "block";
																get(ref(database, 'users/' + id +'/xquang/'+ data[key].date)).then((snapshot) => {
																	if(snapshot.val()){
																			document.getElementById("des").innerHTML = snapshot.val().description;
																			document.getElementById("pic").src = snapshot.val().url;
																	}
																	else {
																			alert("Chưa có kết quả chụp!!!");
																		}
																});
															}
															else {
																document.getElementById("xrayres").style.display = "none";
															}
														});
													}
													if (table.innerHTML == "") {
														document.getElementById("get_history").innerHTML = "Không có";	
													}
													else {
														document.getElementById("history-header").style.borderBottom = "0.5px solid #8b5f00";
														document.getElementById("get_history").innerHTML = "Thu gọn";
													}
													check_history=1;
												});
											}
											else if(check_vaitro==2) {
												document.getElementById("luachon_xetnghiem").style.display = "block";
												document.getElementById("name_xetnghiem").innerHTML = snapshot.val().name;
											};
											if(snapshot.val().xetnghiem_mau=="Có" && check_vaitro==1) {
												document.getElementById("ketquaxetnghiem").style.display = "block";
												document.getElementById("xetnghiem-header").style.borderBottom = "0.5px solid #8b5f00";
												get(ref(database, 'users/' + id +'/xetnghiemmau/'+snapshot.val().date)).then((snapshot) => {
													if(snapshot.val()){
														var data_1 = snapshot.val();
														var i = 1;
														
														
														for (var key_1 in data_1) {
															document.getElementById("xetnghiemmau"+i).innerHTML = data_1[key_1];
															i++;
														}
													}
													else {
														alert("Chưa có kết quả xét nghiệm!!!");
														//Reload data in table
														var l = 1;
														while(document.getElementById("xetnghiemmau"+l)) {
														document.getElementById("xetnghiemmau"+l).innerHTML = "Đang chờ";
														l++;
														}
													}
												});
											}
											else {
												document.getElementById("ketquaxetnghiem").style.display = "none";
											}
										
											if(snapshot.val().chup_xquang=="Có"&&check_vaitro==1) {
												document.getElementById("xrayres").style.display = "block";
												get(ref(database, 'users/' + id +'/xquang/'+snapshot.val().date)).then((snapshot) => {
													if(snapshot.val()){
															document.getElementById("des").innerHTML = snapshot.val().description;
															document.getElementById("pic").src = snapshot.val().url;
													}
													else {
															alert("Chưa có kết quả chụp!!!");
														}
												});
											}
											else {
												document.getElementById("xrayres").style.display = "none";
											}
										
										}
										
									});	
									
								});		
							}
						}
					});
					check=1;
				}
			});
			
			document.getElementById("capnhat").addEventListener("click", function() {
				var getid = document.getElementById('userid').innerHTML.valueOf();
				var chandoan = document.getElementById("chandoan_input").value;
				var dieutri = document.getElementById("dieutri_input").value;
				var trangthai = document.getElementById("status_input").value;
				update(ref(database, 'users/' + getid), {
					status: trangthai,
					chandoan: chandoan,
					dieutri: dieutri,
				});
				if(document.getElementById("xetnghiem_input").checked==true){
					update(ref(database, 'users/' + getid), {
						xetnghiem_mau: "Có"
					});
				}

				get(ref(database, 'users/' + getid)).then((snapshot) => {
					update(ref(database, 'users/' + getid+ '/history/'+snapshot.val().date), {
						date: snapshot.val().date,
						time: snapshot.val().time,
						specialization: snapshot.val().specialization,
						yourhealthcare: snapshot.val().yourhealthcare_name,
						status: trangthai,
						xetnghiem_mau: snapshot.val().xetnghiem_mau,
						chup_xquang: snapshot.val().chup_xquang,
						chandoan: chandoan,
						dieutri: dieutri
					});
				})
				alert("Cập nhật thành công!!");
				document.getElementById("chandoan_input").value = "";
				document.getElementById("dieutri_input").value = "";
				document.getElementById("patient-container").style.display = "none";
			});

			document.getElementById("get_history").addEventListener("click", function() {
				if(check_history==1) {
					if (document.getElementById("get_history").innerHTML == "Không có") {return;}
					var table = document.getElementById("table_history");
					table.innerHTML = "";
					document.getElementById("history-header").style.borderBottom = "none";
					document.getElementById("get_history").innerHTML = "Xem";
					document.getElementById("ketquaxetnghiem").style.display = "none";
					document.getElementById("xrayres").style.display = "none";
					check_history=0;
				}
				else {
					var table = document.getElementById("table_history");
					table.innerHTML = "";
					var getid = document.getElementById('userid').innerHTML.valueOf();
					get(ref(database, 'users/' + getid +'/history/')).then((snapshot) => {
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
						cell6.innerHTML = data[key].chandoan;
						cell7.innerHTML = data[key].dieutri;
						if(data[key].xetnghiem_mau=="Có"||data[key].chup_xquang=="Có") cell8.innerHTML="Có";
						else cell8.innerHTML="Không";
						var button = document.createElement("button");
						button.innerHTML = "Xem";
						button.type="button";
						button.id = key;
						cell9.appendChild(button);
						i++;
						document.getElementById(key).addEventListener("click", function(){
							var id = document.getElementById('userid').innerHTML;
							if(data[key].xetnghiem_mau=="Có" && check_vaitro==1) {
								document.getElementById("ketquaxetnghiem").style.display = "block";
								document.getElementById("xetnghiem-header").style.borderBottom = "0.5px solid #8b5f00";
								get(ref(database, 'users/' + id +'/xetnghiemmau/'+ data[key].date)).then((snapshot) => {
									if(snapshot.val()){
										var data_1 = snapshot.val();
										var i = 1;
										
										for (var key_1 in data_1) {
											document.getElementById("xetnghiemmau"+i).innerHTML = data_1[key_1];
											i++;
										}
									}
									else {
										alert("Chưa có kết quả xét nghiệm!!!");
										//Reload data in table
										var l = 1;
										while(document.getElementById("xetnghiemmau"+l)) {
										document.getElementById("xetnghiemmau"+l).innerHTML = "Đang chờ";
										l++;
										}
									}
								});
							}
							else {
								document.getElementById("ketquaxetnghiem").style.display = "none";
							}
						
							if(data[key].chup_xquang=="Có"&&check_vaitro==1) {
								document.getElementById("xrayres").style.display = "block";
								get(ref(database, 'users/' + id +'/xquang/'+ data[key].date)).then((snapshot) => {
									if(snapshot.val()){
											document.getElementById("des").innerHTML = snapshot.val().description;
											document.getElementById("pic").src = snapshot.val().url;
									}
									else {
											alert("Chưa có kết quả chụp!!!");
										}
								});
							}
							else {
								document.getElementById("xrayres").style.display = "none";
							}
						});
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

			document.getElementById("option_xetnghiem_button").addEventListener("click", function() {
				if(document.getElementById("optionxetnghiem").value=="optionxetnghiemmau"){
					document.getElementById("update_xetnghiem").style.display = "block";
					document.getElementById("update_xquang").style.display = "none";
				}
				else if(document.getElementById("optionxetnghiem").value=="optionchupxquang"){
					document.getElementById("update_xquang").style.display = "block";
					document.getElementById("update_xetnghiem").style.display = "none";
				}
			});

			document.getElementById("xetnghiemmau").addEventListener("click", function() {
				var getid = document.getElementById('userid').innerHTML.valueOf();
				get(ref(database, 'users/' + getid)).then((snapshot) => {
					update(ref(database, 'users/' + getid + '/xetnghiemmau/'+snapshot.val().date), {
						WBC: document.getElementById("WBC").value,
						NEU: document.getElementById("NEU").value,
						LYM: document.getElementById("LYM").value,
						MONO: document.getElementById("MONO").value,
						BASO: document.getElementById("BASO").value,
						EOS: document.getElementById("EOS").value,
						RBC: document.getElementById("RBC").value,
						HGB: document.getElementById("HGB").value,
						HCT: document.getElementById("HCT").value,
						MCV: document.getElementById("MCV").value,
						MCH: document.getElementById("MCH").value,
						MCHC: document.getElementById("MCHC").value,
						RDW: document.getElementById("RDW").value,
						PLT: document.getElementById("PLT").value,
						MPV: document.getElementById("MPV").value,
						NhomMau: document.getElementById("NhomMau").value,
						Rh: document.getElementById("Rh").value
					});
					document.getElementById("update_xetnghiem").reset();
				})
				alert("Cập nhật xét nghiệm máu thành công!!");
				document.getElementById("update_xetnghiem").style.display = "none";
				
			});

			document.getElementById("updatexray").addEventListener("click", function() {
				var getid = document.getElementById('userid').innerHTML.valueOf();
				get(ref(database, 'users/' + getid)).then((snapshot) => {
					update(ref(database, 'users/' + getid + '/xquang/'+snapshot.val().date), {
						description: document.getElementById("Description").value,
						url: document.getElementById("xray").value,
					});
					document.getElementById("update_xquang").reset();
				})
				alert("Cập nhật chụp x-quang thành công!!");
				document.getElementById("update_xquang").style.display = "none";						
			});

			// document.getElementById("hidden").addEventListener("click", function() {
			// 	var table = document.getElementById("listpatienttable");
			// 	var message = document.getElementById("name_patient");
			// 	document.getElementById("tracuu_thongtin").style.display = "none";
			// 	table.innerHTML = "";
			// 	message.innerHTML = "";
			// 	check--;
			// })
			

			  

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