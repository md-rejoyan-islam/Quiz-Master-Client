import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ICreateQuestionFormData } from "@/lib/types";
import QuestionForm from "./question-form";

const EditQuestionDialog = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  questionToEdit,
  setQuestions,
}: {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  questionToEdit: ICreateQuestionFormData | null;
  setQuestions: React.Dispatch<React.SetStateAction<ICreateQuestionFormData[]>>; // Function to update the questions list
}) => {
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="sm:max-w-[500px] bg-slate-900 text-white border-purple-500/20 rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Edit Question
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Make changes to your question here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        {questionToEdit && (
          <QuestionForm
            currentQuestion={questionToEdit}
            type="edit"
            setQuestions={setQuestions}
          >
            <Button
              type="submit"
              onClick={() => {
                setIsEditDialogOpen(false);
              }}
              className="bg-purple-600 w-full hover:bg-purple-700 text-white"
            >
              Save Changes
            </Button>
          </QuestionForm>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditQuestionDialog;
