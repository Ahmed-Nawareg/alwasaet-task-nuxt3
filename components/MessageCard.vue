<template>
    <div :class="['message', { 'message--read': message.isRead }]">
        <label class="message-checkbox">
            <input
                type="checkbox"
                :checked="isSelected"
                @change="toggleSelect"
                class="message-checkbox__input"
            />
        </label>
        <h3
            class="message__title"
            @click="openSlider(message)"
        >{{ message.title }}</h3>
    </div>
</template>

<script setup>

const { message, isSelected } = defineProps([
    'message', 'isSelected'
]);
const emit = defineEmits();
const isSelectedRef = ref(isSelected);

const toggleSelect = () => {
    isSelectedRef.value = !isSelectedRef.value;
    emit('toggleSelect');
}
const openSlider = () => {
    emit('openSlider', message);
};
</script>

<style lang="scss" scoped>
.message {
    border: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px 24px;
    font-size: 14px;
    font-weight: 500;
    color: #121829;
    &__title {
        cursor: pointer;
    }
}
.message--read {
    // opacity: 0.5; /*based on task instruction */
    background-color: #f3f6fb; /*based on figma style */
}

.message-checkbox {
    display: flex;
    align-items: center;
    &__input {
        width: 20px;
        height: 20px;
    }
}
</style>
