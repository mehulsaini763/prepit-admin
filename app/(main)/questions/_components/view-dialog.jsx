"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, Loader2, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import moment from "moment";
import useQuestions from "@/hooks/useQuestions";

const questionSchema = z
  .object({
    question: z.string().min(1, "Question is required"),
    options: z.array(z.string().min(1, "Option is required")).length(4),
    correctOption: z
      .number()
      .min(1, "Correct Option must be between 1 and 4")
      .max(4, "Correct Option must be between 1 and 4"),
    isCaselet: z.boolean(),
    caseletSituation: z.string().optional(),
    explanation: z.string().min(1, "Explanation is required"),
    imageUrl: z.string().optional(),
    topic: z.string().min(1, "Topic is required"),
  })
  .refine(
    (data) => {
      if (data.isCaselet) {
        return !!data.caseletSituation && data.caseletSituation.length > 0;
      }
      return true;
    },
    {
      message: "Caselet Situation is required if isCaselet is true",
      path: ["caseletSituation"],
    }
  );

const ViewDialog = ({ question }) => {
  const { deleting, deleteQuestion, updating, updateQuestion } = useQuestions();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      ...question,
      createdAt: moment(question.createdAt.toDate()).format(
        "MMMM Do YYYY, h:mm:ss a"
      ),
      updatedAt: question.updatedAt
        ? moment(question.updatedAt.toDate()).format("MMMM Do YYYY, h:mm:ss a")
        : "",
    },
  });
  console.log(question);

  const onSubmit = async (data) => {
    await updateQuestion(question.categoryId, question.questionId, data);
    reset(data);
  };

  return (
    question && (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Question Details</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-h-96 h-full overflow-hidden">
              <div className="space-y-2 h-full overflow-y-auto">
                {getValues("imageUrl") != "" && (
                  <div>
                    <Label htmlFor="imageUrl" className="text-sm">
                      ImageUrl
                    </Label>
                    <Input id="imageUrl" {...register("imageUrl")} />
                    {errors.imageUrl && (
                      <p className="text-red-400">{errors.imageUrl.message}</p>
                    )}
                  </div>
                )}
                <div>
                  <Label htmlFor="question" className="text-sm">
                    Question
                  </Label>
                  <Input id="question" {...register("question")} />
                  {errors.question && (
                    <p className="text-red-400">{errors.question.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="topic" className="text-sm">
                    Topic
                  </Label>
                  <Input id="topic" {...register("topic")} />
                  {errors.topic && (
                    <p className="text-red-400">{errors.topic.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="options" className="text-sm">
                    Options
                  </Label>
                  <div className="space-y-1">
                    {question.options.map((option, index) => (
                      <Input
                        key={index}
                        id={`options[${index}]`}
                        {...register(`options.${index}`)}
                        defaultValue={option}
                      />
                    ))}
                    {errors.options && (
                      <p className="text-red-400">{errors.options.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="correctOption" className="text-sm">
                    Correct Option
                  </Label>
                  <Input
                    id="correctOption"
                    type="number"
                    {...register("correctOption", {
                      setValueAs: (value) => parseInt(value),
                    })}
                  />
                  {errors.correctOption && (
                    <p className="text-red-400">
                      {errors.correctOption.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="explanation" className="text-sm">
                    Explanation
                  </Label>
                  <Input id="explanation" {...register("explanation")} />
                  {errors.explanation && (
                    <p className="text-red-400">{errors.explanation.message}</p>
                  )}
                </div>
                {getValues("isCaselet") && (
                  <>
                    <div>
                      <Label htmlFor="caseletSequence" className="text-sm">
                        Caselet Sequence
                      </Label>
                      <Input
                        type="number"
                        id="caseletSequence"
                        {...register("caseletSequence", {
                          setValueAs: (value) => parseInt(value),
                        })}
                      />
                      {errors.caseletSequence && (
                        <p className="text-red-400">
                          {errors.caseletSequence.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="caseletSituation" className="text-sm">
                        Caselet Situation
                      </Label>
                      <Input
                        id="caseletSituation"
                        {...register("caseletSituation")}
                      />
                      {errors.caseletSituation && (
                        <p className="text-red-400">
                          {errors.caseletSituation.message}
                        </p>
                      )}
                    </div>
                  </>
                )}
                <div>
                  <Label htmlFor="createdAt" className="text-sm">
                    Created At
                  </Label>
                  <Input
                    id="createdAt"
                    disabled
                    value={moment(question.createdAt.toDate()).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="updatedAt" className="text-sm">
                    Updated At
                  </Label>
                  <Input
                    id="updatedAt"
                    disabled
                    value={moment(question.updatedAt.toDate()).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  />
                </div>
                <br />
                <DialogHeader>
                  <DialogTitle>Metrics</DialogTitle>
                </DialogHeader>
                <div>
                  <Label htmlFor="metrics.attempts" className="text-sm">
                    Attempts
                  </Label>
                  <Input
                    disabled
                    id="metrics.attempts"
                    {...register("metrics.attempts")}
                  />
                  {errors.attempts && (
                    <p className="text-red-400">{errors.attempts.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="metrics.correct" className="text-sm">
                    Correct
                  </Label>
                  <Input
                    disabled
                    id="metrics.correct"
                    {...register("metrics.correct")}
                  />
                  {errors.correct && (
                    <p className="text-red-400">{errors.correct.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="metrics.incorrect" className="text-sm">
                    Incorrect
                  </Label>
                  <Input
                    disabled
                    id="metrics.incorrect"
                    {...register("metrics.incorrect")}
                  />
                  {errors.incorrect && (
                    <p className="text-red-400">{errors.incorrect.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="metrics.difficultyRatio" className="text-sm">
                    Difficulty Ratio
                  </Label>
                  <Input
                    disabled
                    id="metrics.difficultyRatio"
                    {...register("metrics.difficultyRatio")}
                  />
                  {errors.difficultyRatio && (
                    <p className="text-red-400">
                      {errors.difficultyRatio.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <br />
            <DialogFooter>
              <div className={"w-full flex justify-between items-center gap-2"}>
                <DialogClose asChild>
                  <Button
                    disabled={deleting}
                    size="sm"
                    variant="destructive"
                    className="gap-1"
                    onClick={async () =>
                      await deleteQuestion(question.categoryId, question.id)
                    }
                  >
                    {deleting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        <Trash className="h-3.5 w-3.5" />
                        <span className="sr-only lg:not-sr-only lg:whitespace-nowrap">
                          Trash
                        </span>
                      </>
                    )}
                  </Button>
                </DialogClose>
                <div className="flex items-center gap-2">
                  {isDirty && (
                    <DialogClose asChild>
                      <Button disabled={updating} type="submit">
                        Save
                      </Button>
                    </DialogClose>
                  )}
                  <DialogClose asChild>
                    <Button disabled={updating} type="button" variant="outline">
                      Close
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
  );
};

export default ViewDialog;
