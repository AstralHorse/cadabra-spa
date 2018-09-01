import { PropState } from "@/lib"
import * as api from "../api"

export const state = PropState.create({
    user: undefined as api.In.User,
    page: 0
});
