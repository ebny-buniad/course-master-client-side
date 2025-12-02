import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../../../firebase.config.js'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log(user)

    // Create user in firebase
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Catch user
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }, []);

    // Sign in a user
    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // logout user
    const logOut = () => {
        return signOut(auth)
    }

    const authInfo = {
        createUser,
        user,
        signInUser,
        logOut,
        loading
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;