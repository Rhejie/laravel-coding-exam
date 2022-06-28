import UserProfile from '@/interfaces/UserProfile';
import { ref } from 'vue'
import store from '../../store/index'

export const useProfile = () : UserProfile => {
    const profile = ref<UserProfile>();

    profile.value = store.state.profile;

    return profile.value;
}