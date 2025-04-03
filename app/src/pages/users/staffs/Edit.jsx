import { getUserById } from "../../../api/user";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserForm from "../../../components/users/Form";

const EditStaff = () => {
  const [user, setUser] = useState(null);

  const params = useParams();

  useEffect(() => {
    getUserById(params.id)
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        toast.error(error?.data, {
          autoClose: 1500,
        });
      });
  }, [params.id]);

  return (
    <section className="py-10 bg-slate-100 min-h-svh  px-4 lg:px-6">
      <div className="sm:w-3/5 lg:min-h-[70vh] rounded-xl shadow-md mx-auto py-8 px-12 bg-white mb-10">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-textColor">
          Edit Staff
        </h2>

        <UserForm isEditing={true} user={user} />
      </div>
    </section>
  );
};

export default EditStaff;
