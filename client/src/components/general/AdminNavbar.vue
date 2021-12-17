<template>
<div class="adminNav">
    <h1 class="title pl-4 pt-4">EEE Lifelong Learning Space</h1>
    <h2 class="subtitle pl-4 pt-2">Admin Panel</h2>
    <aside class="menu">
        <p class="menu-label">General</p>
        <ul class="menu-list">
            <li><router-link class="router" active-class="active" :to="{ name: 'Admin Home' }">Home</router-link></li>
            <li><a>About</a></li>
            <li><a>Articles</a></li>
        </ul>
        <p class="menu-label">Workshops</p>
        <ul class="menu-list">
            <li><router-link class="router" active-class="active" :to="{ name: 'Admin Workshop' }">Manage Workshops</router-link></li>
            <li><a>View Past Workshops</a></li>
        </ul>
        <p class="menu-label">Rooms</p>
        <ul class="menu-list">
            <li><a>Past Bookings</a></li>
            <li><a>Current Bookings</a></li>
        </ul>
        <p class="menu-label">Users</p>
        <ul class="menu-list">
            <li><a>Manage Users</a></li>
        </ul>
    </aside>
</div>
</template>

<style scoped>
.adminNav {
    background-color: rgb(245, 245, 245);
    min-height: 100vh;
}

.menu-label, .menu-list a  {
    padding-left: 1rem;
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
