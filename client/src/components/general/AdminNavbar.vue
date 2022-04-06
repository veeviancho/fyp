<template>
<div class="adminNav">
    <router-link :to="{ name: 'Home' }"><h1 class="title pl-5 pt-5">Lifelong Learning @ EEE</h1></router-link>
    <h2 class="subtitle pl-5 pt-2">Admin Panel</h2>
    <aside class="menu">
        <p class="menu-label">General</p>
        <ul class="menu-list">
            <li><router-link class="router" active-class="active" :to="{ name: 'Admin Home' }">Home</router-link></li>
            <li><router-link class="router" active-class="active" :to="{ name: 'Admin About' }">About</router-link></li>
            <li><router-link class="router" active-class="active" :to="{ name: 'Admin Articles' }">Articles</router-link></li>
        </ul>
        <p class="menu-label">Contact Form</p>
        <ul class="menu-list">
            <li><router-link class="router" active-class="active" :to="{ name: 'Admin Messages' }">View Messages</router-link></li>
        </ul>
        <p class="menu-label">Workshops</p>
        <ul class="menu-list">
            <li><router-link class="router" active-class="active" :to="{ name: 'Admin Workshop' }">Manage Workshops</router-link></li>
            <li><router-link class="router" active-class="active" :to="{ name: 'Admin Past Workshop' }">View Past Workshops</router-link></li>
        </ul>
        <p class="menu-label">Users</p>
        <ul class="menu-list">
            <li><router-link class="router" active-class="active" :to="{ name: 'Admin Users' }">Manage Users</router-link></li>
        </ul>
    </aside>
</div>
</template>

<style scoped>
.adminNav {
    background-color: rgb(245, 245, 245);
    min-height: 100vh;
    height: 105%
}

.menu-label, .menu-list a  {
    padding-left: 1.6rem;
}

.router:hover {
    background-color: white;
}

.active {
    font-weight: bold;
    /* background-color: #f8f4f4; */
    /* background-color: #ececec; */
    background-color: white;
}
</style>
