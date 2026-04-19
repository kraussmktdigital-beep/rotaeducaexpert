console.log("APP CARREGADO");

auth.onAuthStateChanged(user => {

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("user").innerText =
    "Logado: " + user.email;
});

function logout(){
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}