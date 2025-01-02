"use client";
import React, { useEffect, useState } from "react";
import * as resource from "../../../config/list";
import * as resources from "../../../config/form";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import List from "@/components/Main/List";
import { useInternalService } from "@/components/hook/useInternalService";
import { toast } from "react-toastify";
import Form from "@/components/Main/Form";

interface Category {
  id: number;
  category_name: string;
  category_code: string;
}

const Page = ({ params }: any) => {
  const { slug }: any = params;
  
  const columns = resource[slug];
  const column = resources[slug];
  const router = useRouter();
  const [data, setData] = useState<Category | any>({});
  const [isPopupDelete, setIsPopupDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteCategoryName, setDeleteCategoryName] = useState<string>("");
  const [isPopupe, setIsPopupe] = useState(false);
  const [inputeField, setInputeField] = useState<any>([]);
  const [errors, setErrors] = useState<Partial<any>>({});
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const columnVal = column?.map((field: any) => ({
      title: field.title,
      column: field.column,
      type: field.type,
      selectKey: field.selectKey,
      source: field.source || "",
    }));
    setInputeField(columnVal);
  }, [column]);

  const handleError = (newError: any) => {
    setErrors((prevData: any) => ({
      ...prevData,
      ...newError,
    }));
  };

  const [fetchResource, resourceResult, resourceInProgress, resourceError] =
    useInternalService(`${slug?.toLowerCase()}`, "GET", null);

  const [
    createResource,
    createResourceResult,
    createResourceInProgress,
    createResourceError,
  ] = useInternalService(`${slug?.toLowerCase()}`, "POST", null);

  const [
    updateResource,
    updateResourceResult,
    updateResourceInProgress,
    updateResourceError,
  ] = useInternalService(`${slug?.toLowerCase()}/${data.id}`, "PUT", null);

  const [
    deleteResource,
    deleteResourceResult,
    deleteResourceInProgress,
    deleteResourceError,
  ] = useInternalService(`${slug?.toLowerCase()}`, "DELETE", null);

  const handleSubmit = () => {
    const payload: any = {};
    let formValid = true;

    setErrors({});

    inputeField?.forEach((field: any) => {
      if (field && field.column !== "status" && !data[field.column]) {
        formValid = false;
        handleError({ [field.column]: `${field.title} is required` });
      }
      if (field.type === "checkbox") {
        payload[field.column] = data[field.column] ?? true;
      } else if (data[field.column]) {
        payload[field.column] = data[field.column];
      }
    });

    if (!formValid) return;

    if (data.id) {
      updateResource(payload);
    } else {
      createResource(payload);
    }
  };

  useEffect(() => {
    if (createResourceResult || updateResourceResult) {
      toast.success(
        ` ${updateResourceResult ? ` ${slug} updated` : `${slug} created`} successfully.`,
        {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        }
      );
      fetchResource();
      setIsPopupe(false);
    }
  }, [createResourceResult, updateResourceResult]);

  useEffect(() => {
    if (deleteResourceResult) {
      toast.error(`${slug} deleted successfully.`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      setIsPopupDelete(false);
      fetchResource();
    }
  }, [deleteResourceResult]);

  const handleChange = (newData: any) => {
    setData((prevData: any) => ({
      ...prevData,
      ...newData,
    }));
  };

  useEffect(() => {
    if (!isPopupe) {
      fetchResource();
      setErrors({});
    }
  }, [isPopupe]);

  useEffect(() => {
    if (resourceResult) {
      setData(
        resourceResult?.data?.data?.[slug] ||
          resourceResult?.data?.data.subCategory ||
          resourceResult?.data?.data.meteStatusCode ||
          resourceResult?.data?.data.ChargeType ||
          []
      );
    }
  }, [resourceResult]);

  const handleDelete = (id: string, categoryName: string) => {
    setDeleteId(Number(id));
    setDeleteCategoryName(categoryName);
    setIsPopupDelete(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteResource(null, [deleteId.toString()]);
    }
  };

  const handleEdit = (item: any) => {
    setIsPopupe(!isPopupe);
    setData(item);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (search.trim() !== "") {
      fetchResource(null, undefined, { searchItem: search });
    } else {
      fetchResource();
    }
  }, [search]);

  const handlePopupeForm = () => {
    // if (slug !== "billAgencyEnrollment") {
      setIsPopupe(!isPopupe);
    // } else {
      // router.push("/billAgencyEnrollment");
    }


  return (
    <div>
      <DefaultLayout>
        {isPopupe && (
          <Form
            column={inputeField}
            slug={slug}
            data={data}
            handleError={handleError}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setIsPopupe={setIsPopupe}
            errors={errors}
          />
        )}

        <div className="mt-14">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {slug
                .split(/(?=[A-Z])/)
                .map((word: string, index: number) =>
                  index === 0
                    ? word.charAt(0).toUpperCase() + word.slice(1)
                    : word
                )
                .join(" ")}{" "}
            </h2>
            <div className="flex">
              <form className="max-w-md mx-auto mr-4">
                <div>
                  <input
                    onChange={handleSearchChange}
                    type="search"
                    id="default-search"
                    className="block w-[200px] p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                    placeholder={`Search ${slug
                      .split(/(?=[A-Z])/)
                      .map((word: string, index: number) =>
                        index === 0
                          ? word.charAt(0).toUpperCase() + word.slice(1)
                          : word
                      )
                      .join(" ")}`}
                    required
                  />
                </div>
              </form>
              <button
                onClick={handlePopupeForm}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Add {slug.charAt(0).toUpperCase() + slug.slice(1)}
              </button>
            </div>
          </div>
        </div>

        {resourceInProgress ? (
          <div>Loading...</div>
        ) : (
          <List
            columns={columns}
            data={Array.isArray(data) ? data : []}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}

        {isPopupDelete && deleteId && (
          <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-100 relative w-full md:w-[550px] m-auto rounded-md">
              <div className="mx-auto max-w-6xl">
                <div className="rounded-lg border shadow-lg">
                  <p className="bg-white text-black-2 text-center py-4 text-xl font-semibold">
                    Are you sure you want to delete the {slug}?
                  </p>
                  <div className="flex justify-center space-x-4 py-6 bg-gray-200 rounded-b-lg">
                    <button
                      onClick={confirmDelete}
                      disabled={deleteResourceInProgress}
                      className={`bg-red-600 text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-red-700 transition duration-200 ${deleteResourceInProgress ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {deleteResourceInProgress ? "Deleting..." : "Delete"}
                    </button>
                    <button
                      onClick={() => setIsPopupDelete(false)}
                      className="bg-white text-gray-800 px-6 py-2 rounded-md text-lg font-semibold border border-gray-300 hover:bg-gray-100 transition duration-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DefaultLayout>
    </div>
  );
};

export default Page;
