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

var check_page = 0;

document.getElementById("login").addEventListener("click", function() {
var email =  document.getElementById("email").value;
var password = document.getElementById("password").value;
if(email.includes("hospital.")==true||email=="admin@gmail.com"){
	alert("Vui lòng đăng nhập với tài khoản bệnh nhân!!");
	return;
}
signInWithEmailAndPassword(auth, email, password)
	.then((userCredential) => {
		if (check_page == 1) {}
		else {
			// Signed in
			check_page = 1; 
			const user = userCredential.user;
			console.log(user);
			alert("Đăng nhập thành công!!");

			var check_history = 0;

			get(ref(database, 'users/' + user.uid)).then((snapshot) => {
				if (snapshot.exists()) {
					document.getElementById("message").innerHTML = "Xin chào " + snapshot.val().name;
					document.getElementById("welcome").innerHTML = "Welcome you, " + snapshot.val().name;
					document.getElementById('userid').innerHTML = user.uid;
					document.getElementById("ngayxetnghiem").innerHTML = snapshot.val().date;
				}
				else {
					document.getElementById("message").innerHTML = "Vui lòng cập nhật thông tin cá nhân";
				}
			})

			document.getElementById('container-ring').style.display = 'none';
			document.getElementById('content').style.background = 'linear-gradient(135deg, #b3beeb, #bcc6e4)';
			document.getElementById('slide-menu').style.display = 'block';
			document.getElementsByClassName('menu-trigger')[0].style.display = 'inline-block';
			document.getElementById('banner').style.display = 'block';
			document.getElementById('content').style.padding = '0px 0px';
			
			// document.getElementById('updateaccount').style.display = 'block';
			// document.getElementById('tracuutaikhoan').style.display = 'block';
			// document.getElementById('schedule').style.display = 'block';	

			document.getElementById("updateaccount").addEventListener("click", function() {
				document.getElementById('form-container').style.display = 'block';
				document.getElementById('info-container').style.display = 'none';
				document.getElementById('schedule-container').style.display = 'none';
				document.getElementById('khambenh-container').style.display = 'none';
				document.getElementById('banner').style.display = 'none';
				document.getElementById("ketquaxetnghiem").style.display = "none";
				document.getElementById("xrayres").style.display = "none";
				document.getElementById('content').style.padding = '40px';
				var table = document.getElementById("table_history");
				table.innerHTML = "";
				check_history=0;
			});

			document.getElementById("schedule").addEventListener("click", function() {
				document.getElementById('form-container').style.display = 'none';
				document.getElementById('info-container').style.display = 'none';
				document.getElementById('schedule-container').style.display = 'block';
				document.getElementById('khambenh-container').style.display = 'none';
				document.getElementById('banner').style.display = 'none';
				document.getElementById("ketquaxetnghiem").style.display = "none";
				document.getElementById("xrayres").style.display = "none";
				document.getElementById('content').style.padding = '40px';
				var table = document.getElementById("table_history");
				table.innerHTML = "";
				check_history=0;
			});
			document.getElementById("history").addEventListener("click", function() {
				document.getElementById('form-container').style.display = 'none';
				document.getElementById('info-container').style.display = 'none';
				document.getElementById('schedule-container').style.display = 'none';
				document.getElementById('banner').style.display = 'none';
				document.getElementById('content').style.padding = '40px';
				document.getElementById('khambenh-container').style.display = 'block';
				if(check_history==1) {
					if (document.getElementById("get_history").innerHTML == "Không có") {return;}
					var table = document.getElementById("table_history");
					table.innerHTML = "";
					document.getElementById("history-header").style.borderBottom = "none";
					//document.getElementById("get_history").innerHTML = "Xem";
					document.getElementById("ketquaxetnghiem").style.display = "none";
					document.getElementById("xrayres").style.display = "none";
					check_history=0;
				}
				else {
					var table = document.getElementById("table_history");
				get(ref(database, 'users/' + user.uid+'/history/')).then((snapshot) => {
					console.log(snapshot.val());
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
						if(data[key].xetnghiem_mau=="Có"||data[key].chup_xquang=="Có"){
							cell8.innerHTML="Có";
						}
						else {
							cell8.innerHTML="Không";
							continue;
						}
						var button = document.createElement("button");
						button.innerHTML = "Xem";
						button.type="button";
						button.id = key;
						cell9.appendChild(button);
						i++;
						document.getElementById(key).addEventListener("click", function(){
							get(ref(database, 'users/' + user.uid+'/xetnghiemmau/'+this.id)).then((snapshot) => {
								if(snapshot.val()){
									document.getElementById("ketquaxetnghiem").style.display = "block";
									var data_xn = snapshot.val();
									var i = 1;
									document.getElementById("ngayxetnghiem").innerHTML = this.id;
									for (var key_xn in data_xn) {
										document.getElementById("xetnghiemmau"+i).innerHTML = data_xn[key_xn];
										i++;
									}
								}
								else {
									document.getElementById("ketquaxetnghiem").style.display = "none";
								}
							});
							get(ref(database, 'users/' + user.uid+'/xquang/'+this.id)).then((snapshot) => {
								if(snapshot.val()){
									document.getElementById("xrayres").style.display = "block";
									document.getElementById("ngaychupxquang").innerHTML = this.id;
									document.getElementById("des").innerHTML = snapshot.val().description;
									document.getElementById("pic").src = snapshot.val().url;
								}
								else {
									document.getElementById("xrayres").style.display = "none";
								}
							});
						})
					}
					
		  		});
				check_history=1;
				}				
			});
			document.getElementById('tracuutaikhoan').addEventListener("click", function() {
				var table = document.getElementById("table_history");
				table.innerHTML = "";
				check_history=0;
				document.getElementById("ketquaxetnghiem").style.display = "none";
				document.getElementById("xrayres").style.display = "none";
				document.getElementById('khambenh-container').style.display = 'none';
				document.getElementById('form-container').style.display = 'none';
				document.getElementById('info-container').style.display = 'block';
				document.getElementById('schedule-container').style.display = 'none';
				document.getElementById('banner').style.display = 'none';
				document.getElementById('content').style.padding = '40px';
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
				var dateofbirth = new Date(document.getElementById("dateofbirth").value).toLocaleDateString('vi-VN');
				

				update(ref(database, 'users/' + user.uid), {
					email: email,
					name: name,
					phone: phone,
					address: address,
					gender: gender,
					dateofbirth: dateofbirth
					});
				alert("Cập nhật thông tin thành công, vui lòng đăng nhập lại!!");
				document.getElementById("form-container").style.display = "none";
			});

			document.getElementById("register").addEventListener("click", function() {
				var date = document.getElementById("date").value;
				var time = document.getElementById("time").value;
				var task = gettask(getDayOfWeek(date),time);
				var specialization = document.getElementById("specialization").value;
				update(ref(database, 'users/' + user.uid), {
					date: date,
					time: time,
					specialization: specialization,
					status: "Chưa khám bệnh",
					chandoan: "Chưa có",
					dieutri: "Chưa có",
					xetnghiem_mau: "Không",
					chup_xquang: "Không"
				});
				get(ref(database, 'healthcares/')).then((snapshot) => {
					var data = snapshot.val();
					for (var key in data) {
						document.getElementById('schedule_inner').innerHTML="";
						if (data[key].specialization == specialization) {
							document.getElementById('schedule_inner').innerHTML = data[key].schedule;
							var schedule = document.getElementById('schedule_inner').innerHTML.valueOf();
							if(schedule.includes(task)==true) {
								update(ref(database, 'users/' + user.uid), {
									yourhealthcare: key,
									yourhealthcare_name: data[key].name
								});
							}

							
						} else {
							continue;
						}
					}
	
				})
				alert("Đăng ký lịch khám bệnh thành công!!");
				document.getElementById('schedule-container').style.display = 'none';
			});
		}

		function getDayOfWeek(date) {
			const dayOfWeek = new Date(date).getDay();    
				return isNaN(dayOfWeek) ? null : 
				  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
		}
		function compareTime(time1, time2) {
			let time1Parts = time1.split(":");
			let time2Parts = time2.split(":");
			if (time1Parts[0] > time2Parts[0]) {
				return true;
			} else if (time1Parts[0] < time2Parts[0]) {
				return false;
			} else {
				// Hours are equal, compare minutes
				if (time1Parts[1] >= time2Parts[1]) {
					return true;
				} else {
					return false;
				}
			}
		}
		function gettask(date,time) {
			if(date=="Monday") {
				if(compareTime(time,"08:00")&&compareTime("10:00",time)==true) return "task1";
				if(compareTime(time,"10:00")&&compareTime("12:00",time)==true) return "task8";
				if(compareTime(time,"14:00")&&compareTime("16:00",time)==true) return "task15";
				if(compareTime(time,"16:00")&&compareTime("18:00",time)==true) return "task22";
			}
			else if(date=="Tuesday") {
				if(compareTime(time,"08:00")&&compareTime("10:00",time)==true) return "task2";
				if(compareTime(time,"10:00")&&compareTime("12:00",time)==true) return "task9";
				if(compareTime(time,"14:00")&&compareTime("16:00",time)==true) return "task16";
				if(compareTime(time,"16:00")&&compareTime("18:00",time)==true) return "task23";
			}
			else if(date=="Wednesday") {
				if(compareTime(time,"08:00")&&compareTime("10:00",time)==true) return "task3";
				if(compareTime(time,"10:00")&&compareTime("12:00",time)==true) return "task10";
				if(compareTime(time,"14:00")&&compareTime("16:00",time)==true) return "task17";
				if(compareTime(time,"16:00")&&compareTime("18:00",time)==true) return "task24";
			}
			else if(date=="Thursday") {
				if(compareTime(time,"08:00")&&compareTime("10:00",time)==true) return "task4";
				if(compareTime(time,"10:00")&&compareTime("12:00",time)==true) return "task11";
				if(compareTime(time,"14:00")&&compareTime("16:00",time)==true) return "task18";
				if(compareTime(time,"16:00")&&compareTime("18:00",time)==true) return "task25";
			}
			else if(date=="Friday") {
				if(compareTime(time,"08:00")&&compareTime("10:00",time)==true) return "task5";
				if(compareTime(time,"10:00")&&compareTime("12:00",time)==true) return "task12";
				if(compareTime(time,"14:00")&&compareTime("16:00",time)==true) return "task19";
				if(compareTime(time,"16:00")&&compareTime("18:00",time)==true) return "task26";
			}
			else if(date=="Saturday") {
				if(compareTime(time,"08:00")&&compareTime("10:00",time)==true) return "task6";
				if(compareTime(time,"10:00")&&compareTime("12:00",time)==true) return "task13";
				if(compareTime(time,"14:00")&&compareTime("16:00",time)==true) return "task20";
				if(compareTime(time,"16:00")&&compareTime("18:00",time)==true) return "task27";
			}
			else if(date=="Sunday") {
				if(compareTime(time,"08:00")&&compareTime("10:00",time)==true) return "task7";
				if(compareTime(time,"10:00")&&compareTime("12:00",time)==true) return "task14";
				if(compareTime(time,"14:00")&&compareTime("16:00",time)==true) return "task21";
				if(compareTime(time,"16:00")&&compareTime("18:00",time)==true) return "task28";
			}
		}






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
