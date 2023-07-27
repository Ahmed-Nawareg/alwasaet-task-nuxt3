<template>
    <!-- :class="isOpen && 'slider-open'" -->
    <div
        class="slider"
        @keydown="handleKeydown"
        tabindex="-1"
        ref="sliderRef"
        id="myElement"
    >
        <div class="close-dev">
            <button
                class="close-button"
                @click="closeSlider"
            ></button>
        </div>
        <div
            v-if="message"
            class="main-content"
            @keydown="handleKeydown"
        >
            <div class="main-content__header">
                <div class="main-content__header__close">
                    <button
                        class="main-content__header__close__button"
                        @click="closeSlider"
                    ><img src="../assets/images/x-close.svg" /> Close (Esc)</button>
                </div>
                <ActionButtons
                    v-if="isOpen"
                    :messagesIds="[message.id]"
                    :key="isOpen"
                    :formMessageSlider="true"
                />
            </div>
            <div class="main-content__message-container">
                <p class="main-content__message-container__title">{{ message?.title }}</p>
                <p class="main-content__message-container__content">{{ message?.content }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const { isOpen, message } = defineProps([
    'isOpen', 'message'
]);
const emit = defineEmits()

const sliderRef = ref(null); // Create a ref to store the DOM reference of the slider

const setFocus = () => {
    if (sliderRef.value) {
        sliderRef.value.focus();
    }
};
onUpdated(setFocus); // Set focus when the component is updated

onMounted(() => {
    setFocus()
    if (message) {
        document.getElementById('myElement').classList.add('slider-open')
    }
});
import { useMessagesStore } from '@/stores/messages';
const messagesStore = useMessagesStore()
const messages = messagesStore.messages

const addToArchive = () => {
    emit('addToArchive')
}
const removeFromArchive = () => {
    emit('removeFromArchive')
}

const markAsRead = () => {
    emit('markAsRead')
}
const markAsUnread = () => {
    emit('markAsUnread')
}



const closeSlider = () => {
    emit('closeSlider')
}

const handleKeydown = (event) => {
    if (event.key === 'a') {
        if (!message.isArchived) {
            addToArchive();
        } else if (message.isArchived) {
            removeFromArchive();
        }
    } else if (event.key === 'r') {
        if (!message.isRead) {
            markAsRead();
        }
    } else if (event.key === 'n') {
        if (message.isRead) {
            markAsUnread();
        }
    } else if (event.key === 'Escape') {
        closeSlider()
    }
};
</script>

<style lang="scss" scoped>
/* .slider {
    display: flex;
    background-color: #4c576488;
    position: fixed;
    top: 0;
    right: -100%;
    height: 100%;
    width: 100%;
    z-index: 999;
    opacity: 0;
    transition: opacity 0.15s ease;
}
.slider-open {
    right: 0;
    opacity: 1;
    transition: opacity 0.15s ease;
}

.main-content {
    position: absolute;
    height: 100%;
    width: 50%;
    background-color: #f0f0f0;
    margin-left: auto;
    right: -100%;
    transition: all ease 0.15s;
}
.main-content-open {
    right: 0;
    transition: all ease 0.15s;
}
.close-dev {
    width: 100%;
    height: 100%;
}
.close-button {
    height: 100%;
    width: 100%;
    border: unset;
    background-color: unset;
} */
.slider {
    display: flex;
    background-color: #4c576488;
    position: fixed;
    top: 0;
    right: -100%;
    height: 100%;
    width: 100%;
    z-index: 999;
    transition: all 0.3s ease;
}
.slider-open {
    right: 0;
    transition: all 0.3s ease;
}
.slider-close {
    right: -100%;
    transition: all 0.3s ease;
}

.main-content {
    border: 1px solid #e5e7eb;
    padding: 32px;
    width: 50%;
    background-color: #f0f0f0;
    height: 100%;
    margin-left: auto;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__close,
        &__buttons {
            display: flex;
            gap: 8px;
            align-items: center;
            &__button {
                display: flex;
                gap: 4px;
                background: unset;
                border: unset;
                font-size: 14px;
                font-weight: 500;
                color: #4b5563;
            }
        }
    }
    &__message-container {
        padding-top: 32px;
        &__title {
            font-size: 20px;
            font-weight: 500;
            color: #121829;
        }
        &__content {
            padding-top: 20px;
            font-size: 14px;
            font-weight: 500;
            color: #4b5563;
        }
    }
}
.close-dev {
    width: 50%;
    height: 100%;
}
.close-button {
    height: 100%;
    width: 100%;
    border: unset;
    background-color: unset;
}
</style>
