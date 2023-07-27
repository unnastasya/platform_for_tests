export type User = {
	_id: string;
	name: string;
	surname: string;
	role: "teacher" | "student";
};

export type AddUserType = {
	fullName: string;
	login: string;
	password: string;
};

export type LoginUserType = {
	login: string;
	password: string;
};


export type UserType = {
    userId: string,
    fullName:  string,
    role: "teacher" | "student";
}