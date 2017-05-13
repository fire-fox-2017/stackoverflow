<template>
  <div class="ui page grid">
    <div class="ui page grid">
    <div class="ui page grid">
        
        <div class="ui divider"></div>
        <div class="ui grid">
            <div class="row">
                <div class="column">
                    <div class="ui huge message page grid center aligned">
                        <h1 class="ui large header">Welcome to Hacktiv Overflow</h1>
                        <p>Hacktiv Overflow adalah situs dimana kamu bisa bertanya dan mendapatkan jawaban dari user lain.</p>
                        <a href="#/login" class="ui green button">Daftar sekarang juga</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui hidden divider"></div>
        <div class="ui grid">
            <div class="two column row">
                <div class="column">
                    <h2 class="ui medium header">Fitur voting</h2>
                    <p>Setiap user bisa melakukan voting pada pertanyaan dan jawaban.</p>
                </div>
                <div class="column">
                    <h2 class="ui medium header">Login dan Sign up</h2>
                    <p>Setiap user bisa melakukan login dan sign up</p>
                </div>
            </div>
            <div class="two column row">
                <div class="column">
                    <h2 class="ui medium header">Hanya satu kali vote</h2>
                    <p>Setiap user hanya bisa voting satu kali pada setiap pertanyaan mau pun jawaban.</p>
                </div>
                <div class="column">
                    <h2 class="ui medium header">Membuat pertanyaan atau jawaban</h2>
                    <p>Setiap user bisa membuat pertanyaan atau menjawab pertanyaan.</p>
                </div>
            </div>
            <div class="two column row">
                <div class="column">
                    <h2 class="ui medium header">Fitur edit dan delete</h2>
                    <p>Setiap user hanya bisa melakukan delete dan edit pada pertanyaan mau pun jawaban miliknya sendiri.</p>
                </div>
                <div class="column">
                    <h2 class="ui medium header">Menggunakan Teknologi termutakhir</h2>
                    <p>Hacktiv Overflow menggunakan teknologi Javascript paling baru.</p>
                </div>
            </div>
            <div class="row">
                <div class="column center aligned">
                    <div class="ui divider"></div>  
                    <span>© Hacktiv Overflow 2017</span>
                </div>
            </div>
        </div>
    </div>
    </div>    
    </div>
</template>

<script>
export default {

  name: 'Home',

  data () {
    return {

    };
  }
};
</script>

<style lang="css" scoped>
.ui.divider:not(.vertical):not(.horizontal) {
  border:none;
}
</style>