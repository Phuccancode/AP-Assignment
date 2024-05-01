import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
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
  }
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

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
                    option.text = "Chọn nhân viên y tế";
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

