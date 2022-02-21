import { useCallback, useEffect, useRef, useState } from "react";
import { User } from "src/apollo/__generated__/types";
import { SearchUserCard } from "src/components/search/SearchUserCard";

interface Props {
    users: User[];
    clearSearchInput: () => void;
    onEscape: () => void;
}

export function SearchedUserList({ users, clearSearchInput, onEscape }: Props) {
    const [active, setActive] = useState(-1);
    const ref = useRef<HTMLDivElement>(null);

    const arrowKeyHandler = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "ArrowUp") {
                setActive((curr) => Math.max(0, curr - 1));
            } else if (e.key === "ArrowDown") {
                setActive((curr) => Math.min(users.length - 1, curr + 1));
            } else if (e.key === "Escape") {
                if (active >= 0) {
                    setActive(-1);
                } else {
                    onEscape();
                }
            }
        },
        [users, active]
    );

    useEffect(() => {
        window.addEventListener("keydown", arrowKeyHandler);

        return () => {
            window.removeEventListener("keydown", arrowKeyHandler);
        };
    }, [active]);

    useEffect(() => {
        const clickOutsideHandler = (e: MouseEvent) => {
            if (!ref.current) return;
            if (!ref.current.contains(e.target as Node)) {
                onEscape();
            }
        };

        window.addEventListener("click", clickOutsideHandler);

        return () => {
            window.removeEventListener("click", clickOutsideHandler);
        };
    }, []);

    useEffect(() => {
        setActive(-1);
    }, [users]);

    return (
        <div
            ref={ref}
            className="absolute left-0 w-full p-2 mt-1 space-y-1 overflow-x-hidden overflow-y-auto transition-all border rounded-lg shadow-lg max-h-96 bg-dark-900 border-dark-700 top-full"
        >
            {users.map((user, index) => (
                <SearchUserCard
                    key={user.id}
                    user={user}
                    onClose={() => {
                        onEscape();
                        clearSearchInput();
                    }}
                    active={active === index}
                />
            ))}
        </div>
    );
}
