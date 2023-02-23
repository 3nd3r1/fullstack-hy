import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import BlogPage from "./components/BlogPage";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import "./global.css";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(null);

    const fetchBlogs = async () => {
        const data = await blogService.getAll();
        setBlogs(data.concat().sort((b1, b2) => b2.likes - b1.likes));
    };

    const createBlog = async (newBlog) => {
        try {
            const result = await blogService.create(newBlog);
            setBlogs(
                blogs.concat(result).sort((b1, b2) => b2.likes - b1.likes)
            );
            setNotification({
                type: "success",
                text: `a new blog ${result.title} by ${result.author} added!`,
            });
        } catch (error) {
            setNotification({
                type: "danger",
                text: error.response.data.error,
            });
        }
    };

    const removeBlog = async (blog) => {
        try {
            await blogService.remove(blog.id);
            setBlogs(blogs.filter((b) => b.id !== blog.id));
            setNotification({
                type: "success",
                text: `Removed blog ${blog.title} by ${blog.author}!`,
            });
        } catch (error) {
            setNotification({
                type: "danger",
                text: error.response.data.error,
            });
        }
    };

    const likeBlog = async (blog) => {
        try {
            const result = await blogService.update(
                { ...blog, likes: blog.likes + 1 },
                blog.id
            );
            setBlogs(
                blogs
                    .filter((b) => b.id !== blog.id)
                    .concat(result)
                    .sort((b1, b2) => b2.likes - b1.likes)
            );
        } catch (error) {
            setNotification({
                type: "danger",
                text: error.respons.data.error,
            });
        }
    };

    const logout = () => {
        window.localStorage.removeItem("userSession");
        setUser(null);
    };

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("userSession");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
        }
    }, []);

    useEffect(() => {
        if (user !== null) {
            blogService.setToken(user.token);
            window.localStorage.setItem("userSession", JSON.stringify(user));
            fetchBlogs();
        }
    }, [user]);

    useEffect(() => {
        if (notification !== null) {
            setTimeout(() => setNotification(null), 5000);
        }
    }, [notification]);

    return (
        <div>
            <h2 className="text-center m-4">Bloglist</h2>
            <Notification notification={notification} />
            {user === null && (
                <LoginForm
                    setUser={setUser}
                    setNotification={setNotification}
                />
            )}
            {user !== null && (
                <BlogPage
                    blogs={blogs}
                    user={user}
                    logout={logout}
                    createBlog={createBlog}
                    removeBlog={removeBlog}
                    likeBlog={likeBlog}
                />
            )}
        </div>
    );
};

export default App;
