import BaseRepository from './BaseRepository';

class MeRepository extends BaseRepository {
    getPath() {
        return '/me';
    }

    signIn(email, password, clientId, clientSecret) {
        return this.post('/signin', {
            email,
            password,
            client_id: clientId,
            client_secret: clientSecret,
        });
    }

    signUp(email, password, name, profileImage, clientId, clientSecret) {
        return this.post('/signup', {
            email,
            password,
            name,
            profile_image: profileImage,
            client_id: clientId,
            client_secret: clientSecret,
        });
    }

    getMe() {
        return this.get('/me');
    }

    signOut() {
        return this.post('/signout');
    }
}

export default MeRepository;
