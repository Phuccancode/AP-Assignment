import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getDatabase, set, ref,get, update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"; // Import the getDatabase function from the firebase-database module
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
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
  }
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const analytics = getAnalytics(app);
const database = getDatabase(app);
console.log(app);

document.getElementById('getschedule').addEventListener('click', function(){
    document.getElementById('Done').addEventListener('click', function(){
        var email = document.getElementById('email_schedule').value;
        var password = document.getElementById('password_schedule').value;
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            get(ref(database, 'healthcares/' + user.uid)).then((snapshot) => {
                if(snapshot.val() == null) {
                    alert("Bạn không phải nhân viên y tế");
                    return;
                }
                var name = snapshot.val().name;
                get(ref(database, 'schedule/')).then((snapshot) => {
                    var data = snapshot.val();
                    for(var key in data) {
                        if(data[key] == "") continue;
                        if(data[key].includes(name)){
                            if(data[key]!=name) {
                                document.getElementById(key).innerHTML=name;
                            }
                            else {
                            document.getElementById(key).innerHTML = data[key];
                            }
                        }
                    }
                });
                document.getElementById('schedule_healthcare').addEventListener('click', function(){
                    update(ref(database, 'healthcares/' + user.uid), {
                        schedule: gettask(1,name)+gettask(2,name)+gettask(3,name)+gettask(4,name)+gettask(5,name)+gettask(6,name)
                    })
                    alert("Đã áp dụng lịch làm việc");
                });
                
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
        document.querySelector('.form_container').style.display = "none";


    });
    
    document.querySelector('.form_container').style.display = "block";
    
});

document.getElementById('Done').addEventListener('click', function(){
    var opvar = document.getElementById('select-doctor').value;
    var id = document.getElementById('idtask').innerHTML.valueOf();
    document.getElementById(id).innerHTML += `<br>${opvar}`;
    document.querySelector('.form_container').style.display = "none";
    document.getElementById('select-doctor').innerHTML = "";
    
})
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
function gettask(date,name) {
    var string_task = "";
    for(var i=1; i<=28; i++) {
        if(document.getElementById('task'+i).innerHTML.valueOf() == name&&i%7==date) {
            string_task+="task"+i+" ";
        }
    }
    return string_task;
}
function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();    
    return isNaN(dayOfWeek) ? null : 
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
}
document.querySelector('.close_but').addEventListener("click", function(){
    var time = "10:01";
    alert(compareTime(time, "08:00")&&compareTime("10:00", time));
    document.querySelector('.form_container').style.display = "none";
    alert(getDayOfWeek("2024-04-18"));
    
});