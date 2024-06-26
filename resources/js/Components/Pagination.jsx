import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <nav>
            <ul className="pagination justify-content-center">
                {links.map((link) => (
                    <li className="page-item" key={link.label}>
                        <Link
                        preserveScroll
                        href={link.url || ""}
                        className={"page-link " + (link.active ? "active" : '')}
                        dangerouslySetInnerHTML={{__html: link.label}}>

                        </Link>
                    </li>
                ))}
            </ul>
            
        </nav>
    )
}