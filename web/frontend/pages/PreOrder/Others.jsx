{/* <>
    <div className="mb-3">
        <Card>
            <div className="flex items-center">
                <div className="flex flex-col">
                    <Text variant="headingMd" as="h5">
                        Pre Order
                    </Text>
                    <p>
                        Status:{" "}
                        <strong className="bg-green-100 px-1 py-0.5 rounded">
                            On
                        </strong>
                    </p>
                </div>
                <div className="ml-auto">
                    <Button>Active</Button>
                </div>
            </div>
        </Card>
    </div>
    <div className="flex w-full">
        <div className="flex-1">
            <Card>
                <div className="flex">
                    <Text variant="headingMd" as="h5">
                        Active on All Products
                    </Text>
                    <label class="relative inline-flex items-center cursor-pointer ml-auto">
                        <input type="checkbox" value="" class="sr-only peer" />
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Active All Products
                                </span>
                    </label>
                </div>
            </Card>
        </div>
        <div className="ml-3 flex-1">
            <Layout>
                <Layout.Section oneHalf>
                    <Card sectioned>
                        <Text as="h2" variant="headingSm">
                            Pre Order Limits
                        </Text>
                        <div className="mt-3">
                            <RadioButton
                                label="No Limit"
                                helpText="Customers will free to select Pre Order products, if it is activated."
                                id="preOrderNoLimit"
                                name="preOrderLimit"
                                checked={preOrderLimit === "preOrder-no-limit"}
                            />

                            <RadioButton
                                label="Total Limit"
                                helpText="Customers will free to select Pre Order products, if it is activated."
                                id="preOrderHasLimit"
                                name="preOrderLimit"
                                checked={preOrderLimit === "preOrder-has-limit"}
                            />

                            {preOrderLimit === "preOrder-has-limit" && (
                                <div className="pl-7">
                                    <TextField
                                        label="Daily Limit"
                                        type="number"
                                        value={preOrderTotalLimit}
                                        onChange={
                                            handleChangePreOrderTotalLimit
                                        }
                                        autoComplete="off"
                                    />
                                </div>
                            )}

                            <RadioButton
                                label="Daily Limit"
                                helpText="Customers will free to select Pre Order products, if it is activated."
                                id="preOrderHasDailyLimit"
                                name="preOrderLimit"
                                checked={
                                    preOrderLimit === "preOrder-has-daily-limit"
                                }
                            />

                            {preOrderLimit === "preOrder-has-daily-limit" && (
                                <div className="pl-7">
                                    <TextField
                                        label="Limit Number"
                                        type="number"
                                        value={preOrderDailyTotalLimit}
                                        onChange={
                                            handleChangePreOrderDailyTotalLimit
                                        }
                                        autoComplete="off"
                                    />
                                </div>
                            )}
                        </div>
                    </Card>

                    <Card sectioned>
                        <Text as="h2" variant="headingSm">
                            General Schedule
                        </Text>
                        <div className="flex mt-3">
                            <div className="w-full">
                                <label htmlFor="startDate">Start Date</label>
                                <input
                                    type="date"
                                    className="border border-neutral-400 mt-2 w-full px-4 py-3 leading-none rounded-lg shadow-sm focus:outline-none text-gray-600 font-medium focus:ring focus:ring-blue-600 focus:ring-opacity-50"
                                />
                            </div>
                            <div className="ml-3 w-full">
                                <div className="mb-3">
                                    <label htmlFor="endDate">End Date</label>
                                    <input
                                        type="date"
                                        className="border border-neutral-400 mt-2 w-full px-4 py-3 leading-none rounded-lg shadow-sm focus:outline-none text-gray-600 font-medium focus:ring focus:ring-blue-600 focus:ring-opacity-50"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-full">
                                <div className="mb-3">
                                    <Checkbox
                                        label="Display Pre Order End Date"
                                        checked={preOrderEndDateShowing}
                                        onChange={
                                            handleChangePreOrderEndDateShowing
                                        }
                                    />
                                </div>
                                <TextField
                                    type="text"
                                    value={preOrderEndDateMessage}
                                    onChange={
                                        handleChangePreOrderEndDateMessage
                                    }
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <div className="flex mt-5">
                            <div className="w-full">
                                <div className="mb-3">
                                    <Checkbox
                                        label="Display Pre Order Time Remaining"
                                        checked={preOrderTimeRemaining}
                                        onChange={
                                            handleChangePreOrderTimeRemaining
                                        }
                                    />
                                </div>
                                <TextField
                                    type="text"
                                    value={preOrderTimeRemainingMessage}
                                    onChange={
                                        handleChangePreOrderTimeRemainingMessage
                                    }
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    </Card>
                </Layout.Section>
                <Layout.Section oneHalf>
                    <Card sectioned>
                        <Text as="h2" variant="headingSm">
                            Button Text
                        </Text>
                        <div className="mt-3">
                            <TextField
                                label="Button Text"
                                type="text"
                                value={preOrderButtonText}
                                onChange={handleChangePreOrderButtonText}
                                autoComplete="off"
                            />
                            <TextField
                                label="Under Button Text"
                                type="text"
                                multiline={4}
                                value={preOrderUnderButtonText}
                                onChange={handleChangePreOrderUnderButtonText}
                                autoComplete="off"
                            />
                            <div className="mt-2">
                                <Button
                                    onClick={
                                        handleChangeOpenPreOrderButtonTextPreview
                                    }
                                >
                                    Preview
                                </Button>
                            </div>
                        </div>
                    </Card>

                    <Card sectioned>
                        <Text as="h2" variant="headingSm">
                            Pre Order Estimated Re-Stock Date
                        </Text>
                        <div className="flex mt-3">
                            <div className="w-full">
                                <label htmlFor="startDate">
                                    Estimated Date
                                </label>
                                <input
                                    type="date"
                                    className="border border-neutral-400 mt-2 w-full px-4 py-3 leading-none rounded-lg shadow-sm focus:outline-none text-gray-600 font-medium focus:ring focus:ring-blue-600 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-full">
                                <div className="mt-3 mb-3">
                                    <Checkbox
                                        label="Display Message"
                                        checked={preOrderEndDateShowing}
                                        onChange={
                                            handleChangePreOrderEndDateShowing
                                        }
                                    />
                                </div>
                                <TextField
                                    type="text"
                                    value={preOrderEstimatedDateMessage}
                                    onChange={
                                        handleChangePreOrderEstimatedDateMessage
                                    }
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    </Card>
                </Layout.Section>

                <Layout.Section oneHalf>
                        <PreOrderBadgeDesign />
                    </Layout.Section>
            </Layout>
        </div>
    </div>
    <GetPreviewModal imgSrc="https://stock-manager.xyz/cdn/previewButtonText.png" />
</>; */}
