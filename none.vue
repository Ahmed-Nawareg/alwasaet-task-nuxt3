<template>
    <div class="container">
        <SideComponent />
        <div class="main-component">

            <NuxtPage />
        </div>
    </div>
</template>

<style>
.container {
    display: flex; /* Use flexbox to create a flexible layout */
    height: 100vh; /* Make the container take full page height */
}

/* Style for SideComponent */
.side-component {
    width: 25%; /* Take 25% of the container width */
    background-color: #f0f0f0; /* Add a background color for demonstration */
}

/* Style for MainComponent */
.main-component {
    flex: 1; /* Take up all available space within the container */
    background-color: #ffffff; /* Add a background color for demonstration */
}
</style>
