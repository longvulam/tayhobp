"use client"
import React from "react";
import { Form, Input, Button, Textarea, DatePicker, Card, CardBody } from "@heroui/react";
import { Path } from "@/app/constants";

type Errors = {
    terms?: string,
    name?: string,
}

export default function ReservationPage() {

    const [password, setPassword] = React.useState("");
    const [errors, setErrors] = React.useState<Errors>({ terms: "" });


    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData);


        // Custom validation checks
        const newErrors = { name: "", password: "" };

        // Password validation
        const passwordError = getPasswordError(data.password as string);

        if (passwordError) {
            newErrors.password = passwordError;
        }

        // Username validation
        if (data.name === "admin") {
            newErrors.name = "Nice try! Choose a different username";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);

            return;
        }

        try {
            const response = await fetch('/api/email', {
                method: 'post',
                body: formData,
            });

        } catch (error) {
            // Clear errors and submit
            setErrors({});
        }

    };

    // Real-time password validation
    const getPasswordError = (value: string) => {
        if (value.length < 4) {
            return "Password must be 4 characters or more";
        }
        if ((value.match(/[A-Z]/g) || []).length < 1) {
            return "Password needs at least 1 uppercase letter";
        }
        if ((value.match(/[^a-z]/gi) || []).length < 1) {
            return "Password needs at least 1 symbol";
        }

        return null;
    };
    // bg-gradient-to-tr from-[#FFB457] to-[#FF705B]
    return (
        // <div className="flex flex-col items-center">
        <div id={Path.Reservation}>
            <Card
                isBlurred
                className="border-none bg-background/60 dark:bg-default-100/50 w-[610px]"
                // className="border-none bg-black/60 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50 max-w-[610px]"
                shadow="sm"
            >
                <CardBody>

                    <Form
                        className="w-full justify-center items-center space-y-4"
                        validationErrors={errors}
                        onReset={() => ""}
                        onSubmit={onSubmit}
                    >
                        <div className="w-full flex flex-col gap-4 max-w-md">
                            <Input
                                isRequired
                                errorMessage={({ validationDetails }) => {
                                    if (validationDetails.valueMissing) {
                                        return "Please enter your name";
                                    }

                                    return errors.name;
                                }}
                                label="Name"
                                labelPlacement="outside"
                                name="name"
                                placeholder="Enter your name"
                            />

                            <Input
                                isRequired
                                errorMessage={({ validationDetails }) => {
                                    if (validationDetails.valueMissing) {
                                        return "Please enter your email";
                                    }
                                    if (validationDetails.typeMismatch) {
                                        return "Please enter a valid email address";
                                    }
                                }}
                                label="Email"
                                labelPlacement="outside"
                                name="email"
                                placeholder="Enter your email"
                                type="email"
                            />

                            <Textarea
                                label="Note"
                                labelPlacement="inside"
                                name="note"
                                placeholder="Type here if your wish to add more"
                            />

                            <DatePicker

                            />

                            {errors.terms && <span className="text-danger text-small">{errors.terms}</span>}

                            <div className="flex gap-4">
                                <Button className="w-full" color="primary" type="submit">
                                    Submit
                                </Button>
                                <Button type="reset" variant="bordered">
                                    Reset
                                </Button>
                            </div>


                        </div>
                    </Form >

                </CardBody>
            </Card>
        </div>
    );
}