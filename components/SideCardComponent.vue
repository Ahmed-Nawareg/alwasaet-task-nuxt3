<template>
    <nuxt-link
        :to="to"
        :class="['card', { 'card--active': isActive }]"
        exact
    >
        <i class="card__icon">
            <img
                :src="getImageAbsolutePath(icon)"
                :alt="text"
            />
        </i>
        <span class="card__text">{{ text }}</span>
        <span class="card__message-count">{{ messageCount }}</span>
    </nuxt-link>
</template>

<script setup>

const { icon, text, messageCount, isActive, to } = defineProps([
    'icon',
    'text',
    'messageCount',
    'isActive',
    'to',
]);

const glob = import.meta.glob("~/assets/images/*", {
    eager: true,
});

const getImageAbsolutePath = (imageName) => {
    return glob[`/assets/images/${imageName}`]["default"];
};
</script>

<style lang="scss" scoped>
/* Add styles for the card component here */
.card {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    text-decoration: none;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 500;
    color: #4b5563;

    &__icon img {
        width: 20px; /* Customize the icon size as needed */
        height: 20px;
        /* Add any additional styles for the icon here */
    }

    &__text {
        flex: 1;
    }

    &--active {
        background-color: #d6e2fb;
        border-radius: 54px;
        color: #121829;
    }
}
</style>