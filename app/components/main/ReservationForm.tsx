"use client"
import React, { useMemo, useRef } from "react";
import {
    Form, Input, Button, Textarea, DatePicker, Card,
    CardBody, NumberInput,
    CalendarDate,
} from "@heroui/react";
import { DateValue, now, parseAbsoluteToLocal } from "@internationalized/date";


type Errors = {
    terms?: string,
    name?: string,
}

export function ReservationForm() {

    const [password, setPassword] = React.useState("");
    const [errors, setErrors] = React.useState<Errors>({ terms: "" });

    const nameInputRef = useRef<HTMLInputElement>(null)

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

    const defaultDate = useMemo(() => {
        let date = now('Europe/Budapest');
        return date.add({ days: 1 });
    }, [])


    return (
        <div className="flex flex-col justify-center gap-12 w-[90%] max-w-[610px]">
            <Button onPress={e => nameInputRef?.current?.focus()}>
                Reserve a table with us
            </Button>

            <Card
                isBlurred
                className="border-none bg-background/60 dark:bg-default-100/50 w-full"
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
                                // id={nameInputId}
                                ref={nameInputRef}
                                isRequired
                                errorMessage={({ validationDetails }) => {
                                    if (validationDetails.valueMissing) {
                                        return "Please enter your name";
                                    }

                                    return errors.name;
                                }}
                                label="Reservation Name"
                                labelPlacement="outside"
                                name="name"
                                placeholder="Name to identify the booking"
                                size="lg"
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
                                size="lg"
                            />

                            <DatePicker
                                isRequired
                                label="Reservation Date & Time"
                                labelPlacement="inside"
                                hideTimeZone
                                showMonthAndYearPickers
                                defaultValue={defaultDate}
                                timeInputProps={{}}
                                size="lg"
                            />

                            <NumberInput
                                isRequired
                                label="Number of Guests"
                                labelPlacement="inside"
                                name="note"
                                placeholder="2+"
                                minValue={1}
                                size="lg"
                            />

                            <Textarea
                                label="Note"
                                labelPlacement="inside"
                                name="note"
                                placeholder="Any special requests or note"
                                size="lg"
                            />

                            <a href=""
                                data-lg-size=""
                            ></a>

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