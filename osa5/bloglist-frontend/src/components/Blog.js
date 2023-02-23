import { useState } from "react";

const Blog = ({ blog, removeBlog, likeBlog, owned }) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="border rounded d-flex flex-column">
            <div className="d-flex flex-row justify-content-between align-items-center py-2">
                <div className="px-4">
                    {blog.title} - <strong>{blog.author}</strong>
                </div>
                <div className="px-4">
                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? "hide" : "view"}
                    </button>
                </div>
            </div>
            {expanded && (
                <div>
                    <div className="text-left w-100 px-4">
                        <strong>Url:</strong>{" "}
                        <a href={blog.url} target="_blank" rel="noreferrer">
                            {blog.url}
                        </a>
                    </div>
                    <div className="text-left w-100 px-4">
                        <strong>Likes:</strong> {blog.likes}
                        <button
                            className="btn btn-secondary btn-sm mx-2"
                            onClick={() => likeBlog(blog)}
                        >
							Like
                        </button>
                    </div>
                    <div className="text-left w-100 px-4 mb-2">
                        <strong>Added By:</strong> {blog.user.name}
                    </div>
                    {owned && (
                        <div className="px-4 mb-3">
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => removeBlog(blog)}
                            >
								Remove
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Blog;
