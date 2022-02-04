import { defaultRedirect } from "src/utils/redirects/default";

export default function Server() {
    return null;
}

// TODO: make this fetch your servers and redirect to first one? (maybe)
export const getServerSideProps = defaultRedirect("/messages");
